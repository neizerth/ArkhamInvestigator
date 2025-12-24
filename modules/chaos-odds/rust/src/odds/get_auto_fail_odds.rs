use crate::types::ChaosOddsToken;
use crate::util::cancel::check_cancel;

// Fixed-size stack - completely stack-allocated, zero heap allocation
// Optimized for mobile (Android/iOS, including older devices): reduced size to fit in L2 cache
// Size: STACK_SIZE * sizeof(DFSState) = 2048 * 24 bytes = ~48KB - fits in L2 cache on mobile devices
const STACK_SIZE: usize = 2048;

/// Token group metadata - stored once, referenced by index
/// Only stores needed fields to avoid unnecessary memory usage
#[derive(Clone, Copy)]
struct TokenGroup {
    count: u8,
    is_fail: bool,
    is_frost: bool,
    reveal_count: u8,
}

/// Optimized DFS state - packed counts in u128, minimal copying
#[derive(Clone, Copy)]
struct DFSState {
    packed_counts: u128, // Packed available counts (3 bits per group, max 32 groups)
    revealed_frost_count: u8, // How many frost tokens have been revealed
    pending_reveal: u8,  // How many tokens still need to be revealed
    probability: f64,    // Probability of current path
    available_mask: u32, // Precomputed bitmask for available groups (bits set if count > 0)
    remaining_total: u8, // Precomputed total remaining tokens
}

/// Fixed-size stack - completely stack-allocated, zero heap allocation
struct FixedStack {
    items: [DFSState; STACK_SIZE],
    len: usize,
}

impl FixedStack {
    #[inline(always)]
    fn new() -> Self {
        let default_state = DFSState {
            packed_counts: 0,
            revealed_frost_count: 0,
            pending_reveal: 0,
            probability: 0.0,
            available_mask: 0,
            remaining_total: 0,
        };
        Self {
            items: [default_state; STACK_SIZE],
            len: 0,
        }
    }

    #[inline(always)]
    fn push(&mut self, item: DFSState) -> bool {
        if self.len >= STACK_SIZE {
            return false; // Stack full
        }
        self.items[self.len] = item;
        self.len += 1;
        true
    }

    #[inline(always)]
    fn pop(&mut self) -> Option<DFSState> {
        if self.len == 0 {
            return None;
        }
        self.len -= 1;
        Some(self.items[self.len])
    }
}

/// Inline: Get count for a specific group from packed u128 (3 bits per group)
#[inline(always)]
fn get_count_inline(packed: u128, group_idx: usize) -> u8 {
    if group_idx >= 32 {
        return 0;
    }
    ((packed >> (group_idx * 3)) & 0x7) as u8
}

/// Inline: Decrement count for a specific group in packed u128
#[inline(always)]
fn dec_count_inline(packed: u128, group_idx: usize) -> u128 {
    if group_idx >= 32 {
        return packed;
    }
    let shift = group_idx * 3;
    let current = ((packed >> shift) & 0x7) as u8;
    if current > 0 {
        let mask = !(0x7u128 << shift);
        (packed & mask) | (((current - 1) as u128) << shift)
    } else {
        packed
    }
}

/// Pack counts into u128 (3 bits per group, max 7 tokens per group)
#[inline(always)]
fn pack_counts_inline(counts: &[u8], group_len: usize) -> u128 {
    let mut packed = 0u128;
    for i in 0..group_len.min(32) {
        let count = counts[i].min(7) as u128;
        packed |= count << (i * 3);
    }
    packed
}

/// Build available_mask from packed_counts - set bit if count > 0
#[inline(always)]
fn build_mask_inline(packed: u128, group_len: usize) -> u32 {
    let mut mask = 0u32;
    for i in 0..group_len.min(32) {
        if get_count_inline(packed, i) > 0 {
            mask |= 1u32 << i;
        }
    }
    mask
}

/// Process a single group in DFS - helper to avoid code duplication
#[inline(always)]
fn process_single_group(
    state: &DFSState,
    group_idx: usize,
    group: TokenGroup,
    prob: f64,
    stack: &mut FixedStack,
    auto_fail_prob: &mut f64,
) {
    match (group.is_fail, group.is_frost) {
        (true, _) => {
            // Fail → auto-fail
            *auto_fail_prob += prob;
        }
        (false, true) => {
            // Frost → check revealed frost
            let new_revealed_frost = state
                .revealed_frost_count
                .saturating_add(group.reveal_count);
            if new_revealed_frost >= 2 {
                *auto_fail_prob += prob;
                return;
            }

            // Prepare next state
            let next_packed = dec_count_inline(state.packed_counts, group_idx);
            let next_pending_reveal = state.pending_reveal.saturating_sub(1) + group.reveal_count;
            let next_mask = if get_count_inline(next_packed, group_idx) == 0 {
                state.available_mask & !(1u32 << group_idx)
            } else {
                state.available_mask
            };
            let next_total = state.remaining_total.saturating_sub(1);

            let _ = stack.push(DFSState {
                packed_counts: next_packed,
                revealed_frost_count: new_revealed_frost,
                pending_reveal: next_pending_reveal,
                probability: prob,
                available_mask: next_mask,
                remaining_total: next_total,
            });
        }
        (false, false) => {
            // Regular token
            let next_packed = dec_count_inline(state.packed_counts, group_idx);
            let next_pending_reveal = state.pending_reveal.saturating_sub(1) + group.reveal_count;
            let next_mask = if get_count_inline(next_packed, group_idx) == 0 {
                state.available_mask & !(1u32 << group_idx)
            } else {
                state.available_mask
            };
            let next_total = state.remaining_total.saturating_sub(1);

            let _ = stack.push(DFSState {
                packed_counts: next_packed,
                revealed_frost_count: state.revealed_frost_count,
                pending_reveal: next_pending_reveal,
                probability: prob,
                available_mask: next_mask,
                remaining_total: next_total,
            });
        }
    }
}

/// Process DFS for small number of groups (unrolled loop, no bitmask iteration)
#[inline(always)]
fn process_small_groups(
    state: DFSState,
    groups: &[TokenGroup],
    group_len: usize,
    stack: &mut FixedStack,
    auto_fail_prob: &mut f64,
) {
    let remaining_total_f64 = state.remaining_total as f64;
    let remaining_total_reciprocal = 1.0 / remaining_total_f64;

    // Unrolled loop for small groups - direct iteration, no trailing_zeros
    for group_idx in 0..group_len {
        let available = get_count_inline(state.packed_counts, group_idx);
        if available == 0 {
            continue;
        }

        let group = groups[group_idx];
        let p = state.probability * (available as f64 * remaining_total_reciprocal);

        process_single_group(&state, group_idx, group, p, stack, auto_fail_prob);
    }
}

/// Process DFS for larger number of groups (bitmask iteration)
#[inline(always)]
fn process_large_groups(
    state: DFSState,
    groups: &[TokenGroup],
    group_len: usize,
    stack: &mut FixedStack,
    auto_fail_prob: &mut f64,
) {
    if state.remaining_total == 0 {
        return;
    }

    let remaining_total_f64 = state.remaining_total as f64;
    let remaining_total_reciprocal = 1.0 / remaining_total_f64;

    // Iterate only over available groups using bit iteration - O(popcount) instead of O(group_len)
    let mut mask = state.available_mask;
    while mask != 0 {
        let group_idx = mask.trailing_zeros() as usize;
        mask &= mask - 1; // Clear the lowest set bit

        if group_idx >= group_len {
            continue;
        }

        let available = get_count_inline(state.packed_counts, group_idx);
        if available == 0 {
            continue;
        }

        let group = groups[group_idx];
        let p = state.probability * (available as f64 * remaining_total_reciprocal);

        process_single_group(&state, group_idx, group, p, stack, auto_fail_prob);
    }
}

/// Main function to calculate auto-fail odds
/// Returns auto-fail probability as a percentage (0-100)
///
/// # Arguments
/// * `tokens` - List of tokens in the chaos bag
/// * `revealed_frost_count` - Number of revealed frost tokens
pub fn get_auto_fail_odds(tokens: &[ChaosOddsToken], revealed_frost_count: usize) -> u8 {
    if tokens.is_empty() {
        return 0;
    }

    // Group tokens by type - single pass, no HashMap, no string cloning
    // Use linear search with small Vec (typically < 10 groups) - faster than HashMap for small N
    let mut groups = Vec::<TokenGroup>::with_capacity(32);
    let mut seen_types: Vec<(&str, usize)> = Vec::new(); // (token_type ref, group_index)

    for token in tokens {
        // Find existing group index or create new one
        let token_type = token.token_type.as_str();
        let group_idx = if let Some(pos) = seen_types.iter().position(|(t, _)| *t == token_type) {
            seen_types[pos].1
        } else {
            if groups.len() >= 32 {
                break; // Max 32 groups supported
            }
            let idx = groups.len();
            let is_frost = token_type == "frost";
            groups.push(TokenGroup {
                count: 0,
                is_fail: token.is_fail,
                is_frost,
                reveal_count: token.reveal_count.min(255) as u8,
            });
            seen_types.push((token_type, idx));
            idx
        };

        groups[group_idx].count = groups[group_idx].count.saturating_add(1);
    }

    let group_len = groups.len();
    if group_len == 0 {
        return 0;
    }

    // Check for cancellation after grouping (before expensive packing/DFS)
    if check_cancel() {
        return 0; // Return 0 on cancellation (conservative default)
    }

    // Pack initial counts into u128 (3 bits per group, max 7 tokens per group)
    let mut initial_counts = [0u8; 32];
    let mut total_tokens: u8 = 0;
    for (i, group) in groups.iter().enumerate() {
        let count = group.count.min(7) as u8; // Clamp to max 7 for packing
        initial_counts[i] = count;
        total_tokens = total_tokens.saturating_add(count);
    }

    let initial_packed = pack_counts_inline(&initial_counts, group_len);
    let initial_mask = build_mask_inline(initial_packed, group_len);

    // Fixed-size stack - completely stack-allocated
    let mut stack = FixedStack::new();

    stack.push(DFSState {
        packed_counts: initial_packed,
        revealed_frost_count: revealed_frost_count.min(255) as u8,
        pending_reveal: 1, // Start with revealing one token
        probability: 1.0,
        available_mask: initial_mask,
        remaining_total: total_tokens,
    });

    let mut auto_fail_prob = 0.0;

    // Choose processing strategy based on group count
    let use_unrolled = group_len <= 8;

    // Check for cancellation before expensive DFS calculation
    if check_cancel() {
        return 0; // Return 0 on cancellation (conservative default)
    }

    while let Some(state) = stack.pop() {
        // Check for cancellation in DFS loop (allows responsive cancellation)
        if check_cancel() {
            break; // Early exit on cancellation
        }

        // Early exit optimization: if we've already found 100% auto-fail, no need to continue
        if auto_fail_prob >= 1.0 {
            break;
        }

        // If we need to reveal tokens, continue revealing
        if state.pending_reveal > 0 {
            if use_unrolled {
                process_small_groups(state, &groups, group_len, &mut stack, &mut auto_fail_prob);
            } else {
                process_large_groups(state, &groups, group_len, &mut stack, &mut auto_fail_prob);
            }
        }
    }

    // Return probability as percentage (rounded to integer)
    (auto_fail_prob * 100.0).round().min(100.0) as u8
}
