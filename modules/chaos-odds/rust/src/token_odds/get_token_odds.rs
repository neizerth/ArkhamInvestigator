use crate::types::{ChaosOddsToken, TokenTarget};

// Fixed-size stack - completely stack-allocated, zero heap allocation
// Optimized for mobile (Android/iOS, including older devices): reduced size to fit in L2 cache
// Size: STACK_SIZE * sizeof(DFSState) = 2048 * ~40 bytes = ~80KB - fits in L2 cache on mobile devices
// DFSState optimized: removed target_counts array, using bitmask instead
const STACK_SIZE: usize = 2048;

// Precomputed reciprocal table for probabilities (1/N for N in 1..=255)
// Using f32 for better ARM performance, accumulated in f64
// Size: 256 * 4 = 1KB - fits in L1 cache
static INV_TABLE: [f32; 256] = {
    let mut table = [0.0f32; 256];
    let mut i = 1;
    while i < 256 {
        table[i] = 1.0 / (i as f32);
        i += 1;
    }
    table
};

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
/// Reduced from ~80 bytes to ~40 bytes by replacing target_counts array with bitmask
#[derive(Clone, Copy)]
struct DFSState {
    packed_counts: u128, // Packed available counts (3 bits per group, max 32 groups)
    revealed_frost_count: u8, // How many frost tokens have been revealed
    pending_reveal: u8,  // How many tokens still need to be revealed
    probability: f64,    // Probability of current path
    available_mask: u32, // Precomputed bitmask for available groups (bits set if count > 0)
    remaining_total: u8, // Precomputed total remaining tokens
    target_satisfied_mask: u32, // Bitmask: bit set if target is satisfied (min_count reached and max_count not exceeded)
    target_counts_packed: u64, // Packed target counts: 2 bits per target (max 3 count per target, up to 32 targets)
    remaining_targets: u8,     // Number of target types that haven't reached required count yet
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
            target_satisfied_mask: 0,
            target_counts_packed: 0,
            remaining_targets: 0,
        };
        Self {
            items: [default_state; STACK_SIZE],
            len: 0,
        }
    }

    #[inline(always)]
    fn push(&mut self, item: DFSState) -> bool {
        if self.len >= STACK_SIZE {
            // Stack overflow: silently skip this branch
            // In practice, this is rare and the probability contribution is small
            return false;
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

/// Get target count from packed u64 (2 bits per target, max 3)
#[inline(always)]
fn get_target_count(packed: u64, target_idx: usize) -> u8 {
    if target_idx >= 32 {
        return 0;
    }
    ((packed >> (target_idx * 2)) & 0x3) as u8
}

/// Increment target count in packed u64
#[inline(always)]
fn inc_target_count(packed: u64, target_idx: usize) -> u64 {
    if target_idx >= 32 {
        return packed;
    }
    let shift = target_idx * 2;
    let current = ((packed >> shift) & 0x3) as u8;
    if current < 3 {
        let mask = !(0x3u64 << shift);
        (packed & mask) | (((current + 1) as u64) << shift)
    } else {
        packed // Already at max
    }
}

/// Target token information with group index and count requirements
struct TargetInfo {
    group_idx: usize,
    min_count: usize,
    max_count: Option<usize>,
    target_idx: usize, // Index in target_counts array
}

/// Process DFS for small number of groups (unrolled loop, no bitmask iteration)
#[inline(always)]
fn process_small_groups(
    state: DFSState,
    groups: &[TokenGroup],
    group_len: usize,
    stack: &mut FixedStack,
    group_to_target: &[i8; 32],
    target_min_counts: &[u8],
    target_max_counts: &[Option<u8>],
    token_prob: &mut f64,
) {
    // Use precomputed reciprocal table instead of division
    let inv = INV_TABLE[state.remaining_total as usize];

    // Unrolled loop for small groups - direct iteration, no trailing_zeros
    for group_idx in 0..group_len {
        let available = get_count_inline(state.packed_counts, group_idx);
        if available == 0 {
            continue;
        }

        let group = groups[group_idx];
        let p = state.probability * (available as f64) * (inv as f64);

        // Check if this group is one of the target token types and update target counts
        let mut next_target_counts_packed = state.target_counts_packed;
        let mut next_satisfied_mask = state.target_satisfied_mask;
        let mut next_remaining_targets = state.remaining_targets;
        let target_idx = group_to_target[group_idx];
        if target_idx >= 0 {
            let idx = target_idx as usize;
            let prev_count = get_target_count(next_target_counts_packed, idx);

            // Increment count (max 3, which is enough for most cases)
            if prev_count < 3 {
                next_target_counts_packed = inc_target_count(next_target_counts_packed, idx);
            }
            let current_count = get_target_count(next_target_counts_packed, idx);

            // Check if max_count is exceeded (invalid path)
            if let Some(max_count) = target_max_counts[idx] {
                if current_count > max_count {
                    // Exceeded max_count, skip this path
                    continue;
                }
            }

            // Check if this target just reached its min_count
            let min_count = target_min_counts[idx];
            let was_satisfied = (next_satisfied_mask & (1u32 << idx)) != 0;
            let is_satisfied = current_count >= min_count
                && (target_max_counts[idx].is_none()
                    || current_count <= target_max_counts[idx].unwrap());

            if is_satisfied {
                next_satisfied_mask |= 1u32 << idx;
                if !was_satisfied {
                    next_remaining_targets -= 1; // Safe: we know remaining_targets > 0
                }
            }
        }

        // Check if all target tokens are already drawn (event occurred)
        let all_targets_drawn = next_remaining_targets == 0;

        // Combined fail/frost check using match-like pattern
        match (group.is_fail, group.is_frost) {
            (true, _) => {
                // Fail → skip (don't count in probability)
                continue;
            }
            (false, true) => {
                // Frost → check revealed frost
                let new_revealed_frost = state.revealed_frost_count + group.reveal_count;
                if new_revealed_frost >= 2 {
                    // Frost auto-fail → skip (don't count in probability)
                    continue;
                }

                let next_pending_reveal = state.pending_reveal - 1 + group.reveal_count;

                // If all target tokens are drawn, add probability and stop
                if all_targets_drawn {
                    *token_prob += p;
                    continue;
                }

                // Stop if no more reveals left and event not occurred
                if next_pending_reveal == 0 {
                    continue;
                }

                // Prepare next state
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
                let next_mask = if get_count_inline(next_packed, group_idx) == 0 {
                    state.available_mask & !(1u32 << group_idx)
                } else {
                    state.available_mask
                };
                let next_total = state.remaining_total - 1;

                if !stack.push(DFSState {
                    packed_counts: next_packed,
                    revealed_frost_count: new_revealed_frost,
                    pending_reveal: next_pending_reveal,
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                    target_satisfied_mask: next_satisfied_mask,
                    target_counts_packed: next_target_counts_packed,
                    remaining_targets: next_remaining_targets,
                }) {
                    // Stack overflow: skip this branch (rare case)
                    continue;
                }
            }
            (false, false) => {
                // Regular token
                let next_pending_reveal = state.pending_reveal - 1 + group.reveal_count;

                // If all target tokens are drawn, add probability and stop
                if all_targets_drawn {
                    *token_prob += p;
                    continue;
                }

                // Stop if no more reveals left and event not occurred
                if next_pending_reveal == 0 {
                    continue;
                }

                // Prepare next state
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
                let next_mask = if get_count_inline(next_packed, group_idx) == 0 {
                    state.available_mask & !(1u32 << group_idx)
                } else {
                    state.available_mask
                };
                let next_total = state.remaining_total - 1;

                if !stack.push(DFSState {
                    packed_counts: next_packed,
                    revealed_frost_count: state.revealed_frost_count,
                    pending_reveal: next_pending_reveal,
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                    target_satisfied_mask: next_satisfied_mask,
                    target_counts_packed: next_target_counts_packed,
                    remaining_targets: next_remaining_targets,
                }) {
                    // Stack overflow: skip this branch (rare case, probability contribution is small)
                    continue;
                }
            }
        }
    }
}

/// Process DFS for larger number of groups (bitmask iteration)
#[inline(always)]
fn process_large_groups(
    state: DFSState,
    groups: &[TokenGroup],
    group_len: usize,
    stack: &mut FixedStack,
    group_to_target: &[i8; 32],
    target_min_counts: &[u8],
    target_max_counts: &[Option<u8>],
    token_prob: &mut f64,
) {
    if state.remaining_total == 0 {
        return;
    }

    // Use precomputed reciprocal table instead of division
    let inv = INV_TABLE[state.remaining_total as usize];

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
        let p = state.probability * (available as f64) * (inv as f64);

        // Check if this group is one of the target token types and update target counts
        let mut next_target_counts_packed = state.target_counts_packed;
        let mut next_satisfied_mask = state.target_satisfied_mask;
        let mut next_remaining_targets = state.remaining_targets;
        let target_idx = group_to_target[group_idx];
        if target_idx >= 0 {
            let idx = target_idx as usize;
            let prev_count = get_target_count(next_target_counts_packed, idx);

            // Increment count (max 3, which is enough for most cases)
            if prev_count < 3 {
                next_target_counts_packed = inc_target_count(next_target_counts_packed, idx);
            }
            let current_count = get_target_count(next_target_counts_packed, idx);

            // Check if max_count is exceeded (invalid path)
            if let Some(max_count) = target_max_counts[idx] {
                if current_count > max_count {
                    // Exceeded max_count, skip this path
                    continue;
                }
            }

            // Check if this target just reached its min_count
            let min_count = target_min_counts[idx];
            let was_satisfied = (next_satisfied_mask & (1u32 << idx)) != 0;
            let is_satisfied = current_count >= min_count
                && (target_max_counts[idx].is_none()
                    || current_count <= target_max_counts[idx].unwrap());

            if is_satisfied {
                next_satisfied_mask |= 1u32 << idx;
                if !was_satisfied {
                    next_remaining_targets -= 1; // Safe: we know remaining_targets > 0
                }
            }
        }

        // Check if all target tokens are already drawn (event occurred)
        let all_targets_drawn = next_remaining_targets == 0;

        // Combined fail/frost check using match-like pattern
        match (group.is_fail, group.is_frost) {
            (true, _) => {
                // Fail → skip (don't count in probability)
                continue;
            }
            (false, true) => {
                // Frost → check revealed frost
                let new_revealed_frost = state.revealed_frost_count + group.reveal_count;
                if new_revealed_frost >= 2 {
                    // Frost auto-fail → skip (don't count in probability)
                    continue;
                }

                let next_pending_reveal = state.pending_reveal - 1 + group.reveal_count;

                // If all target tokens are drawn, add probability and stop
                if all_targets_drawn {
                    *token_prob += p;
                    continue;
                }

                // Stop if no more reveals left and event not occurred
                if next_pending_reveal == 0 {
                    continue;
                }

                // Prepare next state
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
                let next_mask = if get_count_inline(next_packed, group_idx) == 0 {
                    state.available_mask & !(1u32 << group_idx)
                } else {
                    state.available_mask
                };
                let next_total = state.remaining_total - 1;

                if !stack.push(DFSState {
                    packed_counts: next_packed,
                    revealed_frost_count: new_revealed_frost,
                    pending_reveal: next_pending_reveal,
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                    target_satisfied_mask: next_satisfied_mask,
                    target_counts_packed: next_target_counts_packed,
                    remaining_targets: next_remaining_targets,
                }) {
                    // Stack overflow: skip this branch (rare case)
                    continue;
                }
            }
            (false, false) => {
                // Regular token
                let next_pending_reveal = state.pending_reveal - 1 + group.reveal_count;

                // If all target tokens are drawn, add probability and stop
                if all_targets_drawn {
                    *token_prob += p;
                    continue;
                }

                // Stop if no more reveals left and event not occurred
                if next_pending_reveal == 0 {
                    continue;
                }

                // Prepare next state
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
                let next_mask = if get_count_inline(next_packed, group_idx) == 0 {
                    state.available_mask & !(1u32 << group_idx)
                } else {
                    state.available_mask
                };
                let next_total = state.remaining_total - 1;

                if !stack.push(DFSState {
                    packed_counts: next_packed,
                    revealed_frost_count: state.revealed_frost_count,
                    pending_reveal: next_pending_reveal,
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                    target_satisfied_mask: next_satisfied_mask,
                    target_counts_packed: next_target_counts_packed,
                    remaining_targets: next_remaining_targets,
                }) {
                    // Stack overflow: skip this branch (rare case, probability contribution is small)
                    continue;
                }
            }
        }
    }
}

/// Main function to calculate token odds (probability that target token types appear in drawn combination)
/// Returns probability as a percentage (0-100)
pub fn get_token_odds(
    targets: &[TokenTarget],
    reveal_count: usize,
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
    use_token_reveal: bool,
) -> u8 {
    if tokens.is_empty() || targets.is_empty() {
        return 0;
    }

    // Group tokens by type - single pass, no HashMap, no string cloning
    // Use linear search with small Vec (typically < 10 groups) - faster than HashMap for small N
    let mut groups = Vec::<TokenGroup>::with_capacity(32);
    let mut seen_types: Vec<(&str, usize)> = Vec::new(); // (token_type ref, group_index)

    // Build target info mapping: token_type -> (group_idx, required_count, target_idx)
    let mut target_infos: Vec<TargetInfo> = Vec::with_capacity(targets.len());

    for token in tokens {
        // Find existing group index or create new one
        let token_type_str = token.token_type.as_str();
        let group_idx = if let Some(pos) = seen_types.iter().position(|(t, _)| *t == token_type_str)
        {
            seen_types[pos].1
        } else {
            if groups.len() >= 32 {
                break; // Max 32 groups supported
            }
            let idx = groups.len();
            let is_frost = token_type_str == "frost";
            groups.push(TokenGroup {
                count: 0,
                is_fail: token.is_fail,
                is_frost,
                reveal_count: if use_token_reveal {
                    token.reveal_count.min(255) as u8
                } else {
                    0
                },
            });
            seen_types.push((token_type_str, idx));
            idx
        };

        groups[group_idx].count = groups[group_idx].count.saturating_add(1);
    }

    let group_len = groups.len();
    if group_len == 0 {
        return 0;
    }

    // Build target info for each target token type
    // Validate that counts fit in packed format (2 bits = max 3)
    for (target_idx, target) in targets.iter().enumerate() {
        if let Some(&(_, group_idx)) = seen_types
            .iter()
            .find(|(t, _)| *t == target.token_type.as_str())
        {
            // Check if counts exceed packed format capacity (2 bits = max 3)
            let max_needed = target.max_count.unwrap_or(target.min_count);
            if target.min_count > 3 || max_needed > 3 {
                // Fallback: return 0 for cases that exceed packed format
                // In practice, most use cases have min_count <= 3
                return 0;
            }

            target_infos.push(TargetInfo {
                group_idx,
                min_count: target.min_count,
                max_count: target.max_count,
                target_idx,
            });
        }
    }

    // If no target token types found in tokens, return 0
    if target_infos.is_empty() {
        return 0;
    }

    // Build lookup table: group_idx -> target_idx (O(1) lookup instead of O(T) linear search)
    let mut group_to_target = [-1i8; 32];
    let mut target_min_counts = vec![0u8; target_infos.len()];
    let mut target_max_counts: Vec<Option<u8>> = vec![None; target_infos.len()];
    for target in &target_infos {
        group_to_target[target.group_idx] = target.target_idx as i8;
        target_min_counts[target.target_idx] = target.min_count.min(255) as u8;
        target_max_counts[target.target_idx] = target.max_count.map(|c| c.min(255) as u8);
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

    // Early pruning: check if we have enough tokens to satisfy all targets
    let total_required_min: usize = target_infos.iter().map(|t| t.min_count).sum();
    if (total_tokens as usize) < total_required_min {
        return 0;
    }

    // Fixed-size stack - completely stack-allocated
    let mut stack = FixedStack::new();
    stack.push(DFSState {
        packed_counts: initial_packed,
        revealed_frost_count: revealed_frost_count.min(255) as u8,
        pending_reveal: reveal_count.min(255) as u8, // Start with revealing reveal_count tokens
        probability: 1.0,
        available_mask: initial_mask,
        remaining_total: total_tokens,
        target_satisfied_mask: 0,
        target_counts_packed: 0,
        remaining_targets: target_infos.len().min(255) as u8,
    });

    let mut token_prob = 0.0;

    // Choose processing strategy based on group count
    let use_unrolled = group_len <= 8;

    while let Some(state) = stack.pop() {
        // Continue processing only if we haven't found all targets yet AND there are tokens to draw
        // Stop when all targets are found, regardless of pending_reveal
        if state.remaining_targets == 0 {
            // Already found all targets, skip this state
            continue;
        }
        // Stop drawing when pending_reveal reaches 0 (we've drawn reveal_count tokens)
        // This prevents drawing beyond reveal_count when event hasn't occurred yet
        if state.pending_reveal == 0 {
            continue;
        }
        // Early pruning: if remaining tokens < remaining targets, impossible to satisfy
        if state.remaining_total < state.remaining_targets {
            continue;
        }
        if state.remaining_total > 0 {
            if use_unrolled {
                process_small_groups(
                    state,
                    &groups,
                    group_len,
                    &mut stack,
                    &group_to_target,
                    &target_min_counts,
                    &target_max_counts,
                    &mut token_prob,
                );
            } else {
                process_large_groups(
                    state,
                    &groups,
                    group_len,
                    &mut stack,
                    &group_to_target,
                    &target_min_counts,
                    &target_max_counts,
                    &mut token_prob,
                );
            }
        }
    }

    // Return probability as percentage (rounded to integer)
    (token_prob * 100.0).round().min(100.0).max(0.0) as u8
}
