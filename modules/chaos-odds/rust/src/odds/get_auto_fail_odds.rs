use crate::types::ChaosOddsToken;

// Fixed-size stack - completely stack-allocated, zero heap allocation
// Optimized for mobile (Android/iOS, including older devices): reduced size to fit in L2 cache
// Size: STACK_SIZE * sizeof(DFSState) = 2048 * 24 bytes = ~48KB - fits in L2 cache on mobile devices
const STACK_SIZE: usize = 2048;

// ============================================================================
// Approximation Configuration Constants (same as get_chaos_bag_modifiers.rs)
// ============================================================================

/// Maximum reveal tokens to fully process (Strategy 1: Active reveal limit)
/// Tokens beyond this are capped at reveal_count=1
const MAX_FULLY_PROCESSED_REVEAL: usize = 3;

/// Threshold for mass reveal disable (Rule #1)
/// When reveal_tokens_count >= this, ALL reveal_count are set to 0
/// At this point, reveal becomes noise, not information
/// ULTRA-AGGRESSIVE: Same as get_chaos_bag_modifiers.rs (10 instead of 25)
const MASS_REVEAL_DISABLE_THRESHOLD: usize = 10;

/// Maximum pending reveal (Rule #2: hard ceiling)
/// If pending exceeds this, state is finalized immediately
/// ULTRA-AGGRESSIVE: Same as get_chaos_bag_modifiers.rs (1 instead of 3)
const MAX_PENDING_REVEAL: u8 = 1;

/// Threshold for disabling reveal on bless/curse (Rule #3)
/// When reveal_tokens_count >= this, bless/curse reveal is disabled
/// ULTRA-AGGRESSIVE: Same as get_chaos_bag_modifiers.rs (5 instead of 15)
const BLESS_CURSE_REVEAL_DISABLE_THRESHOLD: usize = 5;

/// Threshold for ultra-aggressive approximation
/// If reveal_tokens_count > this, all reveal_count > 1 are reduced to 1
const MANY_REVEAL_TOKENS_THRESHOLD: usize = 12;

/// Threshold for large bag size (ultra-aggressive approximation)
const LARGE_BAG_THRESHOLD: usize = 30;

/// Threshold for moderate approximation
const MEDIUM_REVEAL_TOKENS_THRESHOLD: usize = 6;

/// Threshold for medium bag size (moderate approximation)
const MEDIUM_BAG_THRESHOLD: usize = 10;

/// Threshold for large reveal_count truncation (Strategy 3)
/// If bag has more tokens than this, all reveal_count > 1 are reduced to 1
const LARGE_BAG_FOR_REVEAL_TRUNCATION: usize = 15;

/// Maximum reveal depth for DFS (Strategy 3)
/// Beyond this depth, remaining reveal tokens are averaged instead of fully processed
const MAX_REVEAL_DEPTH: u8 = 2;

/// Token group metadata - stored once, referenced by index
/// Only stores needed fields to avoid unnecessary memory usage
#[derive(Clone, Copy)]
struct TokenGroup {
    count: u8,
    is_fail: bool,
    is_frost: bool,
    reveal_count: u8,
    is_curse: bool,
    is_bless: bool,
}

/// Calculate effective reveal_count with adaptive approximation and limit
/// Same logic as in get_chaos_bag_modifiers.rs
#[inline(always)]
fn effective_reveal_count(
    reveal_count: u8,
    remaining_tokens: usize,
    reveal_tokens_count: usize,
    max_active_reveal: usize,
    use_approximation: bool,
) -> u8 {
    if !use_approximation || reveal_count == 0 {
        return reveal_count;
    }

    // Rule #1: MASS REVEAL DISABLE - If too many reveal tokens, disable ALL reveal
    // At 25+ reveal tokens, reveal becomes noise, not information
    if reveal_tokens_count >= MASS_REVEAL_DISABLE_THRESHOLD {
        return 0; // Completely disable reveal - treat as regular tokens
    }

    // ULTRA-AGGRESSIVE: For very many reveal tokens (>5), always cap at 1
    // Same as get_chaos_bag_modifiers.rs
    if reveal_tokens_count > 5 {
        return 1;
    }

    // CRITICAL: If too many reveal tokens, aggressively limit to prevent explosion
    if reveal_tokens_count > max_active_reveal {
        return 1;
    }

    // Strategy 3: Truncate large reveal_count for large bags
    if remaining_tokens > LARGE_BAG_FOR_REVEAL_TRUNCATION && reveal_count > 1 {
        return 1;
    }

    // Adaptive approximation based on both bag size and number of reveal tokens
    if reveal_tokens_count > MANY_REVEAL_TOKENS_THRESHOLD || remaining_tokens > LARGE_BAG_THRESHOLD
    {
        1
    } else if reveal_tokens_count > MEDIUM_REVEAL_TOKENS_THRESHOLD
        || remaining_tokens > MEDIUM_BAG_THRESHOLD
    {
        reveal_count.min(2)
    } else {
        reveal_count
    }
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

/// Process DFS for small number of groups (unrolled loop, no bitmask iteration)
#[inline(always)]
fn process_small_groups(
    state: DFSState,
    groups: &[TokenGroup],
    group_len: usize,
    stack: &mut FixedStack,
    auto_fail_prob: &mut f64,
    use_approximation: bool,
    reveal_tokens_count: usize,
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

        // Combined fail/frost check using match-like pattern
        match (group.is_fail, group.is_frost) {
            (true, _) => {
                // Fail → auto-fail
                *auto_fail_prob += p;
                continue;
            }
            (false, true) => {
                // Frost → check revealed frost
                // Apply approximation rules for reveal_count
                let effective_reveal = if use_approximation
                    && (group.is_curse || group.is_bless)
                    && reveal_tokens_count >= BLESS_CURSE_REVEAL_DISABLE_THRESHOLD
                {
                    // Rule #3: Disable reveal for bless/curse when too many reveal tokens
                    0
                } else {
                    effective_reveal_count(
                        group.reveal_count,
                        state.remaining_total as usize,
                        reveal_tokens_count,
                        MAX_FULLY_PROCESSED_REVEAL,
                        use_approximation,
                    )
                };

                let new_revealed_frost =
                    state.revealed_frost_count.saturating_add(effective_reveal);
                if new_revealed_frost >= 2 {
                    *auto_fail_prob += p;
                    continue;
                }

                // Rule #2: Hard ceiling on pending - if exceeds MAX_PENDING_REVEAL, finalize immediately
                // ULTRA-AGGRESSIVE: Also cap at MAX_PENDING_REVEAL (don't allow > 1)
                let mut next_pending_reveal =
                    state.pending_reveal.saturating_sub(1) + effective_reveal;
                if use_approximation {
                    // Hard cap: never allow pending > MAX_PENDING_REVEAL
                    next_pending_reveal = next_pending_reveal.min(MAX_PENDING_REVEAL);
                    // If it would exceed, treat as auto-fail
                    if next_pending_reveal > MAX_PENDING_REVEAL {
                        *auto_fail_prob += p;
                        continue;
                    }
                }

                // Prepare next state
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
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
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                });
            }
            (false, false) => {
                // Regular token
                // Apply approximation rules for reveal_count
                let effective_reveal = if use_approximation
                    && (group.is_curse || group.is_bless)
                    && reveal_tokens_count >= BLESS_CURSE_REVEAL_DISABLE_THRESHOLD
                {
                    // Rule #3: Disable reveal for bless/curse when too many reveal tokens
                    0
                } else {
                    effective_reveal_count(
                        group.reveal_count,
                        state.remaining_total as usize,
                        reveal_tokens_count,
                        MAX_FULLY_PROCESSED_REVEAL,
                        use_approximation,
                    )
                };

                // Rule #2: Hard ceiling on pending - if exceeds MAX_PENDING_REVEAL, finalize immediately
                // ULTRA-AGGRESSIVE: Also cap at MAX_PENDING_REVEAL (don't allow > 1)
                let mut next_pending_reveal =
                    state.pending_reveal.saturating_sub(1) + effective_reveal;
                if use_approximation {
                    // Hard cap: never allow pending > MAX_PENDING_REVEAL
                    next_pending_reveal = next_pending_reveal.min(MAX_PENDING_REVEAL);
                    // If it would exceed, treat as auto-fail
                    if next_pending_reveal > MAX_PENDING_REVEAL {
                        *auto_fail_prob += p;
                        continue;
                    }
                }

                let next_packed = dec_count_inline(state.packed_counts, group_idx);
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
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                });
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
    auto_fail_prob: &mut f64,
    use_approximation: bool,
    reveal_tokens_count: usize,
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

        // Combined fail/frost check using match-like pattern
        match (group.is_fail, group.is_frost) {
            (true, _) => {
                // Fail → auto-fail
                *auto_fail_prob += p;
                continue;
            }
            (false, true) => {
                // Frost → check revealed frost
                let new_revealed_frost = state
                    .revealed_frost_count
                    .saturating_add(group.reveal_count);
                if new_revealed_frost >= 2 {
                    *auto_fail_prob += p;
                    continue;
                }

                // Prepare next state
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
                let next_pending_reveal =
                    state.pending_reveal.saturating_sub(1) + group.reveal_count;
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
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                });
            }
            (false, false) => {
                // Regular token
                let next_packed = dec_count_inline(state.packed_counts, group_idx);
                let next_pending_reveal =
                    state.pending_reveal.saturating_sub(1) + group.reveal_count;
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
                    probability: p,
                    available_mask: next_mask,
                    remaining_total: next_total,
                });
            }
        }
    }
}

/// Main function to calculate auto-fail odds
/// Returns auto-fail probability as a percentage (0-100)
///
/// # Arguments
/// * `tokens` - List of tokens in the chaos bag
/// * `revealed_frost_count` - Number of revealed frost tokens
/// * `use_approximation` - If true, apply approximation rules to reduce combinatorial explosion
pub fn get_auto_fail_odds(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
    use_approximation: bool,
) -> u8 {
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
            let is_curse = token_type == "curse";
            let is_bless = token_type == "bless";
            groups.push(TokenGroup {
                count: 0,
                is_fail: token.is_fail,
                is_frost,
                reveal_count: token.reveal_count.min(255) as u8,
                is_curse,
                is_bless,
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

    // Count reveal tokens for adaptive approximation
    let reveal_tokens_count = groups.iter().filter(|g| g.reveal_count > 0).count();

    // ============================================================================
    // FIX #1: Early exit if mass reveal is disabled - DON'T RUN DFS AT ALL
    // ============================================================================
    // If reveal tokens are too many, reveal becomes noise - just return simple auto-fail prob
    if use_approximation && reveal_tokens_count >= MASS_REVEAL_DISABLE_THRESHOLD {
        // reveal = шум → просто считаем вероятность auto-fail без DFS
        // Auto-fail happens if we draw a fail token
        let fail_count: usize = groups
            .iter()
            .filter(|g| g.is_fail)
            .map(|g| g.count as usize)
            .sum();
        let total_count: usize = groups.iter().map(|g| g.count as usize).sum();
        if total_count == 0 {
            return 0;
        }
        let auto_fail_prob = fail_count as f64 / total_count as f64;
        return (auto_fail_prob * 100.0).round().min(100.0) as u8;
    }

    // Fixed-size stack - completely stack-allocated
    let mut stack = FixedStack::new();

    // FIX #2: If mass reveal is disabled, set pending_reveal = 0 to prevent DFS
    let initial_pending =
        if use_approximation && reveal_tokens_count >= MASS_REVEAL_DISABLE_THRESHOLD {
            0
        } else {
            1 // Start with revealing one token
        };

    stack.push(DFSState {
        packed_counts: initial_packed,
        revealed_frost_count: revealed_frost_count.min(255) as u8,
        pending_reveal: initial_pending,
        probability: 1.0,
        available_mask: initial_mask,
        remaining_total: total_tokens,
    });

    let mut auto_fail_prob = 0.0;

    // Choose processing strategy based on group count
    let use_unrolled = group_len <= 8;

    while let Some(state) = stack.pop() {
        // If we need to reveal tokens, continue revealing
        if state.pending_reveal > 0 {
            if use_unrolled {
                process_small_groups(
                    state,
                    &groups,
                    group_len,
                    &mut stack,
                    &mut auto_fail_prob,
                    use_approximation,
                    reveal_tokens_count,
                );
            } else {
                process_large_groups(
                    state,
                    &groups,
                    group_len,
                    &mut stack,
                    &mut auto_fail_prob,
                    use_approximation,
                    reveal_tokens_count,
                );
            }
        }
    }

    // Return probability as percentage (rounded to integer)
    (auto_fail_prob * 100.0).round().min(100.0) as u8
}
