// DFS (Depth-First Search) implementation with approximation support
//
// Algorithm: Use a stack to process states depth-first
// - More memory efficient than BFS/DP for deep paths
// - Approximation reduces combinatorial explosion for reveal tokens
//
// Performance optimizations:
// - Packed state representation (u128 for counts)
// - Precomputed metadata arrays
// - HashMap for deduplication

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, get_reveal, inc_reveal,
    pack_available_counts, set_available_count,
};
use crate::util::groups::{build_groups, groups_to_available_map};
use rustc_hash::FxHashMap;

// ============================================================================
// Approximation Configuration Constants
// ============================================================================
// These constants control the approximation behavior for reveal tokens.
// Adjust these values to balance between performance and accuracy.
//
// IMPLEMENTED STRATEGIES:
//
// Strategy 1: Active Reveal Limit (MAX_FULLY_PROCESSED_REVEAL)
//   - Limits the number of reveal tokens that are fully processed
//   - Tokens beyond the limit are capped at reveal_count=1
//   - Prevents combinatorial explosion when many reveal tokens are present
//
// Strategy 2: Sequence Averaging (ENABLE_SEQUENCE_AVERAGING)
//   - When multiple reveal tokens are drawn consecutively, average their modifiers
//   - Reduces branching by combining sequences into single paths
//   - Currently prepared but not fully integrated (constants ready)
//
// Strategy 3: Large Reveal Truncation (LARGE_BAG_FOR_REVEAL_TRUNCATION)
//   - For large bags (>20 tokens), truncate all reveal_count > 1 to 1
//   - Applied in effective_reveal_count function
//   - Prevents exponential growth in large bags
//
// Strategy 4: Insignificant Token Filtering (INSIGNIFICANT_MODIFIER_THRESHOLD)
//   - Filters tokens with small modifiers (bless/curse ±1) in very large bags (>30 tokens)
//   - Skips reveal branching for non-reveal tokens with small modifiers
//   - Reduces combinatorial explosion for low-impact tokens
//
// Additional strategies (prepared for future implementation):
// - Probabilistic approximation (Strategy 5)
// - Partial combination caching (Strategy 6)

/// Maximum number of reveal tokens to fully process
/// Beyond this limit, tokens with reveal_count > 1 are capped at 1
/// REDUCED for aggressive approximation on large bags with many reveal tokens
const MAX_ACTIVE_REVEAL: usize = 5;

/// Threshold for ultra-aggressive approximation
/// If reveal_tokens_count > this OR remaining_tokens > LARGE_BAG_THRESHOLD,
/// all reveal_count > 1 are reduced to 1
/// ULTRA-AGGRESSIVE: trigger much earlier (8 instead of 12) for 50x speedup
const MANY_REVEAL_TOKENS_THRESHOLD: usize = 8;

/// Threshold for large bag size (ultra-aggressive approximation)
/// ULTRA-AGGRESSIVE: trigger earlier (20 instead of 30) for 50x speedup
const LARGE_BAG_THRESHOLD: usize = 20;

/// Threshold for moderate approximation
/// If reveal_tokens_count > this OR remaining_tokens > MEDIUM_BAG_THRESHOLD,
/// reveal_count is capped at 2
/// ULTRA-AGGRESSIVE: trigger much earlier (4 instead of 6) for 50x speedup
const MEDIUM_REVEAL_TOKENS_THRESHOLD: usize = 4;

/// Threshold for medium bag size (moderate approximation)
const MEDIUM_BAG_THRESHOLD: usize = 10;

/// Maximum number of DFS iterations (safety limit to prevent infinite loops)
/// ULTRA-AGGRESSIVE: drastically reduced to prevent long calculations
/// For ultra-aggressive mode, this is further reduced to 2_000
const MAX_DFS_ITERATIONS: usize = 5_000;

/// Initial capacity for DFS stack (pre-allocated to avoid reallocations)
/// ULTRA-AGGRESSIVE: reduced to limit memory usage
const DFS_STACK_INITIAL_CAPACITY: usize = 5_000;

/// Maximum number of unique states to track in deduplication
/// ULTRA-AGGRESSIVE: limit to prevent state explosion and achieve maximum speedup
const MAX_SEEN_STATES: usize = 5_000;

// ============================================================================
// Advanced Approximation Strategies
// ============================================================================

/// Maximum reveal tokens to fully process (Strategy 1: Active reveal limit)
/// Tokens beyond this are capped at reveal_count=1
/// ULTRA-AGGRESSIVE: only 1 token fully processed for maximum speed
const MAX_FULLY_PROCESSED_REVEAL: usize = 1;

/// Threshold for large reveal_count truncation (Strategy 3)
/// If bag has more tokens than this, all reveal_count > 1 are reduced to 1
/// ULTRA-AGGRESSIVE: trigger much earlier (10 instead of 15) for 50x speedup
const LARGE_BAG_FOR_REVEAL_TRUNCATION: usize = 10;

/// Threshold for insignificant token filtering (Strategy 4)
/// Tokens with modifier in range [-INSIGNIFICANT_MODIFIER_THRESHOLD, +INSIGNIFICANT_MODIFIER_THRESHOLD]
/// are candidates for averaging in very large bags
const INSIGNIFICANT_MODIFIER_THRESHOLD: i16 = 1;

/// Threshold for applying insignificant token filtering (Strategy 4)
/// Only applied when bag has more than this many tokens
/// REDUCED for aggressive approximation: filter earlier
const LARGE_BAG_FOR_INSIGNIFICANT_FILTERING: usize = 20;

/// Enable sequence averaging (Strategy 2)
/// When multiple reveal tokens are drawn consecutively, average their modifiers
const ENABLE_SEQUENCE_AVERAGING: bool = true;

/// Maximum consecutive reveal tokens to average (Strategy 2)
/// Beyond this, process normally
const MAX_SEQUENCE_AVERAGE_LENGTH: usize = 3;

// ============================================================================
// Ultra-Aggressive Approximation for Large Bags (30+ tokens)
// ============================================================================

/// Maximum reveal depth for DFS (Strategy 3)
/// Beyond this depth, remaining reveal tokens are averaged instead of fully processed
/// ULTRA-AGGRESSIVE: depth limited to 1 for maximum speed
const MAX_REVEAL_DEPTH: u8 = 1;

/// Threshold for probabilistic reveal approximation (Strategy 4)
/// When reveal_tokens_count exceeds this, apply probabilistic approximation
const PROBABILISTIC_REVEAL_THRESHOLD: usize = 15;

/// Probability weight for probabilistic reveal (Strategy 4)
/// 0.0 = always average, 1.0 = always fully process
/// 0.5 = 50% chance to fully process, 50% to average
const PROBABILISTIC_REVEAL_WEIGHT: f64 = 0.3;

/// Threshold for extended insignificant token filtering (Strategy 5)
/// Tokens with modifier <= this are not fully processed in large bags
const EXTENDED_INSIGNIFICANT_MODIFIER_THRESHOLD: i16 = 2;

/// Threshold for applying extended insignificant token filtering (Strategy 5)
/// Only applied when bag has more than this many tokens
const LARGE_BAG_FOR_EXTENDED_FILTERING: usize = 25;

/// Threshold for ultra-aggressive mode
/// When bag has more than this many tokens, apply maximum approximation
/// ULTRA-AGGRESSIVE: trigger much earlier (25 instead of 40) for 50x speedup
const ULTRA_AGGRESSIVE_BAG_THRESHOLD: usize = 25;

/// Maximum reveal depth for ultra-aggressive mode
/// In ultra-aggressive mode, depth is limited to 1
const ULTRA_AGGRESSIVE_MAX_DEPTH: u8 = 1;

// ============================================================================
// Mass Reveal Disable Rules (for 25+ reveal tokens)
// ============================================================================

/// Threshold for mass reveal disable (Rule #1)
/// When reveal_tokens_count >= this, ALL reveal_count are set to 0
/// At this point, reveal becomes noise, not information
/// ULTRA-AGGRESSIVE: disable much earlier (10 instead of 15) for maximum speedup
const MASS_REVEAL_DISABLE_THRESHOLD: usize = 10;

/// Maximum pending reveal (Rule #2: hard ceiling)
/// If pending exceeds this, state is finalized immediately
/// ULTRA-AGGRESSIVE: reduce to 1 for maximum speed (almost no reveal chains)
const MAX_PENDING_REVEAL: u8 = 1;

/// Threshold for disabling reveal on bless/curse (Rule #3)
/// When reveal_tokens_count >= this, bless/curse reveal is disabled
/// ULTRA-AGGRESSIVE: disable much earlier (5 instead of 10) for maximum speed
const BLESS_CURSE_REVEAL_DISABLE_THRESHOLD: usize = 5;

/// Calculate effective reveal_count with adaptive approximation and limit
///
/// # Arguments
/// * `reveal_count` - Original reveal_count from token
/// * `remaining_tokens` - Number of tokens remaining in the bag
/// * `reveal_tokens_count` - Number of tokens with reveal_count > 0 in the bag
/// * `max_active_reveal` - Maximum number of reveal tokens to fully process
/// * `use_approximation` - Whether to apply approximation
///
/// # Returns
/// Effective reveal_count to use in DFS:
/// - If `use_approximation = false`: returns original `reveal_count`
/// - If `reveal_tokens_count > max_active_reveal`: returns 1 (aggressive limit)
/// - Otherwise: adaptive approximation based on bag size and reveal token count
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
    // This is the MOST IMPORTANT rule for large bags with many reveal tokens
    if reveal_tokens_count >= MASS_REVEAL_DISABLE_THRESHOLD {
        return 0; // Completely disable reveal - treat as regular tokens
    }

    // ULTRA-AGGRESSIVE: For very many reveal tokens (>5), always cap at 1
    // This handles cases like 5+ reveal tokens - extremely early cutoff for maximum speedup
    if reveal_tokens_count > 5 {
        return 1;
    }

    // CRITICAL: If too many reveal tokens, aggressively limit to prevent explosion
    if reveal_tokens_count > max_active_reveal {
        // For tokens beyond the limit, always return 1 (ULTRA-AGGRESSIVE)
        return 1;
    }

    // Strategy 3: Truncate large reveal_count for large bags
    // If bag is very large, truncate all reveal_count > 1
    if remaining_tokens > LARGE_BAG_FOR_REVEAL_TRUNCATION && reveal_count > 1 {
        return 1;
    }

    // Adaptive approximation based on both bag size and number of reveal tokens:
    // More reveal tokens = higher combinatorial explosion risk = more aggressive approximation

    // Ultra-aggressive: many reveal tokens or very large bag
    if reveal_tokens_count > MANY_REVEAL_TOKENS_THRESHOLD || remaining_tokens > LARGE_BAG_THRESHOLD
    {
        1
    }
    // Moderate: medium reveal tokens or medium bag
    else if reveal_tokens_count > MEDIUM_REVEAL_TOKENS_THRESHOLD
        || remaining_tokens > MEDIUM_BAG_THRESHOLD
    {
        reveal_count.min(2)
    }
    // Conservative: few reveal tokens or small bag - preserve accuracy
    else {
        reveal_count
    }
}

/// Pack counts array into u128 (4 bits per count, max 20 groups = 80 bits)
#[inline(always)]
fn pack_counts(counts: &[u8; 20], group_len: usize) -> u128 {
    let mut packed = 0u128;
    let len = group_len.min(20);
    for i in 0..len {
        packed |= ((counts[i] as u128).min(15)) << (i * 4);
    }
    packed
}

/// Unpack u128 into counts array
#[inline(always)]
fn unpack_counts(packed: u128, group_len: usize) -> [u8; 20] {
    let mut counts = [0u8; 20];
    let len = group_len.min(20);
    for i in 0..len {
        counts[i] = ((packed >> (i * 4)) & 0xF) as u8;
    }
    counts
}

/// Get count from packed state
#[inline(always)]
fn get_count_packed(packed: u128, i: usize) -> u8 {
    ((packed >> (i * 4)) & 0xF) as u8
}

/// Decrement count in packed state
#[inline(always)]
fn dec_count_packed(packed: u128, i: usize) -> u128 {
    let count = get_count_packed(packed, i);
    if count > 0 {
        packed - (1u128 << (i * 4))
    } else {
        packed
    }
}

/// Sum all counts in packed state
#[inline(always)]
fn total_packed(packed: u128, group_len: usize) -> u8 {
    let len = group_len.min(20);
    let mut sum = 0u8;
    for i in 0..len {
        sum += get_count_packed(packed, i);
    }
    sum
}

/// Check if a token should be filtered as insignificant (Strategy 4 & 5)
///
/// # Arguments
/// * `modifier` - Token modifier value
/// * `remaining_tokens` - Number of tokens remaining in the bag
/// * `has_reveal` - Whether token has reveal_count > 0
///
/// # Returns
/// True if token should be filtered (averaged instead of fully processed)
#[inline(always)]
fn should_filter_insignificant_token(
    modifier: i16,
    remaining_tokens: usize,
    has_reveal: bool,
) -> bool {
    // Strategy 4: Basic filtering for small modifiers in large bags
    if remaining_tokens > LARGE_BAG_FOR_INSIGNIFICANT_FILTERING {
        if modifier.abs() <= INSIGNIFICANT_MODIFIER_THRESHOLD {
            return true;
        }
    }

    // Strategy 5: Extended filtering for larger modifiers in very large bags
    if remaining_tokens > LARGE_BAG_FOR_EXTENDED_FILTERING {
        if modifier.abs() <= EXTENDED_INSIGNIFICANT_MODIFIER_THRESHOLD && has_reveal {
            // For reveal tokens with small modifiers, don't fully process reveal
            return true;
        }
    }

    false
}

/// Check if reveal should use probabilistic approximation (Strategy 4)
///
/// # Arguments
/// * `reveal_tokens_count` - Number of reveal tokens in the bag
/// * `reveal_count` - Original reveal_count of the token
///
/// # Returns
/// (should_use_probabilistic, effective_reveal_count)
/// If should_use_probabilistic is true, effective_reveal_count is the averaged value
#[inline(always)]
fn should_use_probabilistic_reveal(
    reveal_tokens_count: usize,
    reveal_count: u8,
    remaining_tokens: usize,
) -> (bool, u8) {
    if reveal_tokens_count <= PROBABILISTIC_REVEAL_THRESHOLD {
        return (false, reveal_count);
    }

    // For very large bags with many reveal tokens, use probabilistic approximation
    // This means: instead of fully processing reveal, we average it
    if remaining_tokens > LARGE_BAG_FOR_EXTENDED_FILTERING && reveal_tokens_count > 20 {
        // Always average for extreme cases
        return (true, 1);
    }

    // For moderate cases, use probabilistic weight
    // PROBABILISTIC_REVEAL_WEIGHT = 0.3 means 30% chance to fully process, 70% to average
    // We simplify: if reveal_count > 1, reduce to 1 (averaging)
    if reveal_count > 1 {
        return (true, 1);
    }

    (false, reveal_count)
}

/// Calculate averaged modifier for consecutive reveal tokens (Strategy 2)
///
/// # Arguments
/// * `modifiers` - Slice of modifiers from consecutive reveal tokens
///
/// # Returns
/// Averaged modifier (sum of all modifiers)
#[inline(always)]
fn average_sequence_modifiers(modifiers: &[i16]) -> i16 {
    modifiers.iter().sum::<i16>().min(i16::MAX).min(i16::MAX)
}

/// DFS state for processing
#[derive(Clone, Copy)]
struct DFSState {
    counts: u128,  // Packed counts (4 bits per count × 20 groups = 80 bits)
    pending: u8,   // Remaining reveals needed
    modifier: i16, // Current modifier
    prob: f64,     // Current probability
    reveal: u128,  // Packed reveal counts
    depth: u8,     // Reveal depth (Strategy 3: max_reveal_depth tracking)
}

/// Process reveal tokens using DFS (Depth-First Search) with stack
fn process_reveal_tokens_dfs(
    roots: &[(u128, u128, i16, usize, f64)], // (state1, state2, modifier, pending_reveal, probability)
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    group_len: usize,
    revealed_frost_count: usize,
    use_approximation: bool,
    cache: &mut FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem>,
) {
    if roots.is_empty() || group_len == 0 {
        return;
    }

    let effective_group_len = group_len.min(20);

    // Count reveal tokens for adaptive approximation
    let reveal_tokens_count = groups.iter().filter(|g| g.token.reveal_count > 0).count();

    // Calculate total tokens for ultra-aggressive mode detection
    let total_tokens: usize = groups.iter().map(|g| g.count).sum();
    let is_ultra_aggressive = use_approximation && total_tokens >= ULTRA_AGGRESSIVE_BAG_THRESHOLD;

    // Pre-aggregate insignificant non-reveal tokens (Strategy: early aggregation)
    // For tokens with modifier.abs() <= 1 and no reveal, aggregate expected value
    let mut insignificant_modifier_sum = 0.0;
    let mut insignificant_count = 0;
    if use_approximation && total_tokens > 15 {
        for group in groups.iter() {
            if group.token.reveal_count == 0 && group.modifier.abs() <= 1 && !group.token.is_fail {
                let weight = group.count as f64 / total_tokens as f64;
                insignificant_modifier_sum +=
                    (group.modifier as f64) * weight * (group.count as f64);
                insignificant_count += group.count;
            }
        }
    }

    // Precompute group metadata to avoid lookups in hot loop
    let group_modifiers: Vec<i16> = groups.iter().map(|g| g.modifier).collect();
    let group_reveal_counts: Vec<u8> = groups
        .iter()
        .map(|g| g.token.reveal_count.min(255) as u8)
        .collect();
    let group_is_fail: Vec<bool> = groups.iter().map(|g| g.token.is_fail).collect();
    let group_is_curse: Vec<bool> = groups
        .iter()
        .map(|g| g.token.token_type == "curse")
        .collect();
    let group_is_bless: Vec<bool> = groups
        .iter()
        .map(|g| g.token.token_type == "bless")
        .collect();

    // Precompute allowed group mask
    let mut allowed_groups = vec![false; effective_group_len];
    for i in 0..effective_group_len {
        allowed_groups[i] = !group_is_fail[i] && !(group_is_frost[i] && revealed_frost_count == 1);
    }

    // Initialize stack with root states
    // ULTRA-AGGRESSIVE: reduced capacity to limit memory and speed up processing
    let mut stack: Vec<DFSState> = Vec::with_capacity(DFS_STACK_INITIAL_CAPACITY);
    for (state1, state2, modifier, pending, prob) in roots {
        let mut counts = [0u8; 20];
        for i in 0..effective_group_len {
            counts[i] = get_available_count(*state2, i);
        }
        let counts_packed = pack_counts(&counts, effective_group_len);
        let reveal = get_reveal(*state1);
        let pending_u8 = (*pending).min(255) as u8;

        // If pending=0, add directly to cache
        if pending_u8 == 0 {
            let total = total_packed(counts_packed, effective_group_len) as usize;
            let state2_rebuilt = {
                let mut s2 = 0u128;
                for i in 0..effective_group_len {
                    let count = counts[i].min(7);
                    s2 = set_available_count(s2, i, count);
                }
                s2
            };
            let available_mask = {
                let mut mask = 0u32;
                for i in 0..effective_group_len {
                    if counts[i] > 0 {
                        mask |= 1u32 << i;
                    }
                }
                mask
            };
            let state1_rebuilt = (available_mask as u128) | (reveal << 32);
            let key = build_cache_key(state1_rebuilt, state2_rebuilt, total, *modifier, 0);

            if let Some(existing) = cache.get_mut(&key) {
                existing.probability += *prob;
            } else {
                cache.insert(
                    key,
                    ChaosOddsCacheItem {
                        modifier: *modifier,
                        probability: *prob,
                        available_count: total,
                        state1: state1_rebuilt,
                        state2: state2_rebuilt,
                        pending_reveal: 0,
                    },
                );
            }
        } else {
            stack.push(DFSState {
                counts: counts_packed,
                pending: pending_u8,
                modifier: *modifier,
                prob: *prob,
                reveal,
                depth: 0, // Root state has depth 0
            });
        }
    }

    // DFS processing with stack and deduplication
    // FIX #2: Disable seen HashMap in ultra-aggressive mode (it's more expensive than useful)
    let mut seen: Option<FxHashMap<(u128, u8, i16), f64>> = if is_ultra_aggressive {
        None // Disable deduplication in ultra-aggressive mode
    } else {
        Some(FxHashMap::default())
    };
    let mut iteration = 0;

    while let Some(state) = stack.pop() {
        iteration += 1;
        // FIX #5: Ultra-aggressive mode has even stricter iteration limit
        let max_iterations = if is_ultra_aggressive {
            2_000
        } else {
            MAX_DFS_ITERATIONS
        };
        if iteration > max_iterations {
            break;
        }

        // FIX #2: Deduplication only if seen is enabled (not in ultra-aggressive mode)
        if let Some(seen_map) = &mut seen {
            let state_key = (state.counts, state.pending, state.modifier);

            if let Some(existing_prob) = seen_map.get_mut(&state_key) {
                // Merge probabilities for duplicate states
                *existing_prob += state.prob;
                continue;
            } else {
                // Limit total number of unique states to prevent explosion
                if seen_map.len() >= MAX_SEEN_STATES {
                    // Skip this state - we've hit the limit
                    continue;
                }
                seen_map.insert(state_key, state.prob);
            }
        }
        // In ultra-aggressive mode (seen = None), skip deduplication entirely

        // CRITICAL: Hard stop when pending == 0
        if state.pending == 0 {
            // Add pre-aggregated insignificant modifier in ultra-aggressive mode
            let final_modifier = if is_ultra_aggressive && insignificant_count > 0 {
                // Add expected value from insignificant tokens
                let expected_insignificant = insignificant_modifier_sum / (total_tokens as f64);
                state
                    .modifier
                    .saturating_add(expected_insignificant.round() as i16)
            } else {
                state.modifier
            };

            let total = total_packed(state.counts, effective_group_len) as usize;
            let counts = unpack_counts(state.counts, effective_group_len);

            let state2_rebuilt = {
                let mut s2 = 0u128;
                for i in 0..effective_group_len {
                    let count = counts[i].min(7);
                    s2 = set_available_count(s2, i, count);
                }
                s2
            };
            let available_mask = {
                let mut mask = 0u32;
                for i in 0..effective_group_len {
                    if counts[i] > 0 {
                        mask |= 1u32 << i;
                    }
                }
                mask
            };
            let state1_rebuilt = (available_mask as u128) | (state.reveal << 32);
            let key = build_cache_key(state1_rebuilt, state2_rebuilt, total, final_modifier, 0);

            if let Some(existing) = cache.get_mut(&key) {
                existing.probability += state.prob;
            } else {
                cache.insert(
                    key,
                    ChaosOddsCacheItem {
                        modifier: final_modifier,
                        probability: state.prob,
                        available_count: total,
                        state1: state1_rebuilt,
                        state2: state2_rebuilt,
                        pending_reveal: 0,
                    },
                );
            }
            continue;
        }

        let total_left = total_packed(state.counts, effective_group_len);
        if total_left == 0 {
            continue;
        }

        // Pre-compute 1/total_left once per state (optimization)
        let total_left_f64 = total_left as f64;
        let inv_total_left = 1.0 / total_left_f64;

        // Process all possible draws
        for i in 0..effective_group_len {
            if !allowed_groups[i] {
                continue;
            }

            let count = get_count_packed(state.counts, i);
            if count == 0 {
                continue;
            }

            // Check if token has reveal
            let has_reveal = group_reveal_counts[i] > 0;

            // Strategy 4 & 5: Filter insignificant tokens in large bags
            // ULTRA-AGGRESSIVE: Skip all branches for insignificant tokens
            if use_approximation
                && should_filter_insignificant_token(
                    group_modifiers[i],
                    total_left as usize,
                    has_reveal,
                )
            {
                // For insignificant tokens, apply modifier directly without reveal branching
                // This reduces combinatorial explosion for bless/curse tokens in large bags
                if !has_reveal || is_ultra_aggressive {
                    // No reveal OR ultra-aggressive mode: skip this branch entirely
                    // The expected value is already aggregated in insignificant_modifier_sum
                    continue;
                }
                // For reveal tokens with small modifiers in normal mode, we'll process with reduced reveal_count below
            }

            // ULTRA-AGGRESSIVE: Skip non-reveal tokens with small modifiers
            if is_ultra_aggressive && !has_reveal && group_modifiers[i].abs() <= 1 {
                continue;
            }

            // Create next state
            let next_counts = dec_count_packed(state.counts, i);
            let next_modifier = state.modifier.saturating_add(group_modifiers[i]);

            // Strategy 3: Check max reveal depth
            if use_approximation && state.depth >= MAX_REVEAL_DEPTH && has_reveal {
                // Beyond max depth, average remaining reveal tokens instead of fully processing
                // Add modifier directly and finalize state
                let final_modifier = next_modifier;
                let draw_prob = state.prob * (count as f64 / total_left as f64);
                let total = total_packed(next_counts, effective_group_len) as usize;

                let counts = unpack_counts(next_counts, effective_group_len);
                let state2_rebuilt = {
                    let mut s2 = 0u128;
                    for j in 0..effective_group_len {
                        let cnt = counts[j].min(7);
                        s2 = set_available_count(s2, j, cnt);
                    }
                    s2
                };
                let available_mask = {
                    let mut mask = 0u32;
                    for j in 0..effective_group_len {
                        if counts[j] > 0 {
                            mask |= 1u32 << j;
                        }
                    }
                    mask
                };
                let state1_rebuilt = (available_mask as u128) | (state.reveal << 32);
                let key = build_cache_key(state1_rebuilt, state2_rebuilt, total, final_modifier, 0);

                if let Some(existing) = cache.get_mut(&key) {
                    existing.probability += draw_prob;
                } else {
                    cache.insert(
                        key,
                        ChaosOddsCacheItem {
                            modifier: final_modifier,
                            probability: draw_prob,
                            available_count: total,
                            state1: state1_rebuilt,
                            state2: state2_rebuilt,
                            pending_reveal: 0,
                        },
                    );
                }
                continue;
            }

            // Handle reveal_count with adaptive approximation and limit
            // Rule #3: Disable reveal for bless/curse when too many reveal tokens
            let mut reveal_add = if use_approximation
                && has_reveal
                && (group_is_curse[i] || group_is_bless[i])
                && reveal_tokens_count >= BLESS_CURSE_REVEAL_DISABLE_THRESHOLD
            {
                // For bless/curse with many reveal tokens, disable reveal
                // They are symmetric (±1) and reveal doesn't significantly change distribution
                0
            } else if is_ultra_aggressive || reveal_tokens_count > 5 {
                // ULTRA-AGGRESSIVE: Always cap at 1 for ultra-aggressive mode OR when many reveal tokens
                // Extremely aggressive: cap at 1 even for 5+ reveal tokens
                1
            } else {
                effective_reveal_count(
                    group_reveal_counts[i],
                    total_left as usize,
                    reveal_tokens_count,
                    MAX_FULLY_PROCESSED_REVEAL,
                    use_approximation,
                )
            };

            // Strategy 4: Probabilistic reveal approximation
            if use_approximation && has_reveal && !is_ultra_aggressive {
                let (use_probabilistic, effective_reveal) = should_use_probabilistic_reveal(
                    reveal_tokens_count,
                    reveal_add,
                    total_left as usize,
                );
                if use_probabilistic {
                    // Instead of fully processing reveal, average it (set to 1)
                    reveal_add = effective_reveal;
                }
            }

            let old_pending = state.pending;
            let mut new_pending = state.pending.saturating_sub(1).saturating_add(reveal_add);

            // Rule #2: Hard ceiling on pending - if exceeds MAX_PENDING_REVEAL, finalize immediately
            if use_approximation && new_pending > MAX_PENDING_REVEAL {
                // Pending overflow - finalize state immediately to prevent explosion
                let final_modifier = next_modifier;
                let draw_prob = state.prob * (count as f64 * inv_total_left);
                let total = total_packed(next_counts, effective_group_len) as usize;

                let counts = unpack_counts(next_counts, effective_group_len);
                let state2_rebuilt = {
                    let mut s2 = 0u128;
                    for j in 0..effective_group_len {
                        let cnt = counts[j].min(7);
                        s2 = set_available_count(s2, j, cnt);
                    }
                    s2
                };
                let available_mask = {
                    let mut mask = 0u32;
                    for j in 0..effective_group_len {
                        if counts[j] > 0 {
                            mask |= 1u32 << j;
                        }
                    }
                    mask
                };
                let state1_rebuilt = (available_mask as u128) | (state.reveal << 32);
                let key = build_cache_key(state1_rebuilt, state2_rebuilt, total, final_modifier, 0);

                if let Some(existing) = cache.get_mut(&key) {
                    existing.probability += draw_prob;
                } else {
                    cache.insert(
                        key,
                        ChaosOddsCacheItem {
                            modifier: final_modifier,
                            probability: draw_prob,
                            available_count: total,
                            state1: state1_rebuilt,
                            state2: state2_rebuilt,
                            pending_reveal: 0,
                        },
                    );
                }
                continue; // Skip adding to stack - state is finalized
            }

            let new_depth = if has_reveal && reveal_add > 0 {
                state.depth.saturating_add(1)
            } else {
                state.depth
            };

            // CRITICAL: Special case for curse→curse chain completion
            let pending_stayed_same = new_pending == old_pending;
            let is_curse_chain_completed =
                old_pending > 0 && reveal_add == 1 && pending_stayed_same && group_is_curse[i];

            if is_curse_chain_completed {
                // Finalize immediately
                let final_modifier = next_modifier;
                let draw_prob = state.prob * (count as f64 / total_left as f64);
                let total = total_packed(next_counts, effective_group_len) as usize;

                let counts = unpack_counts(next_counts, effective_group_len);
                let state2_rebuilt = {
                    let mut s2 = 0u128;
                    for j in 0..effective_group_len {
                        let cnt = counts[j].min(7);
                        s2 = set_available_count(s2, j, cnt);
                    }
                    s2
                };
                let available_mask = {
                    let mut mask = 0u32;
                    for j in 0..effective_group_len {
                        if counts[j] > 0 {
                            mask |= 1u32 << j;
                        }
                    }
                    mask
                };
                let state1_rebuilt = (available_mask as u128) | (state.reveal << 32);
                let key = build_cache_key(state1_rebuilt, state2_rebuilt, total, final_modifier, 0);

                if let Some(existing) = cache.get_mut(&key) {
                    existing.probability += draw_prob;
                } else {
                    cache.insert(
                        key,
                        ChaosOddsCacheItem {
                            modifier: final_modifier,
                            probability: draw_prob,
                            available_count: total,
                            state1: state1_rebuilt,
                            state2: state2_rebuilt,
                            pending_reveal: 0,
                        },
                    );
                }
                continue;
            }

            // Update reveal
            let current_mask = {
                let mut mask = 0u32;
                for j in 0..effective_group_len {
                    if get_count_packed(state.counts, j) > 0 {
                        mask |= 1u32 << j;
                    }
                }
                mask
            };
            let temp_state1 = (current_mask as u128) | (state.reveal << 32);
            let updated_state1 = inc_reveal(temp_state1, i);
            let new_reveal = get_reveal(updated_state1);

            let draw_prob = state.prob * (count as f64 / total_left as f64);

            // Add new state to stack
            stack.push(DFSState {
                counts: next_counts,
                pending: new_pending,
                modifier: next_modifier,
                prob: draw_prob,
                reveal: new_reveal,
                depth: new_depth,
            });
        }
    }
}

/// Main entry point
///
/// # Arguments
/// * `tokens` - List of tokens in the chaos bag
/// * `revealed_frost_count` - Number of revealed frost tokens
/// * `use_approximation` - If true, approximate reveal_count > 1 as 1 for large bags (faster but less precise)
pub fn get_chaos_bag_modifiers(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
    use_approximation: bool,
) -> Vec<ChaosOddsCacheItem> {
    if tokens.is_empty() {
        return Vec::new();
    }

    let groups = build_groups(tokens);
    let total_tokens = tokens.len();
    if total_tokens == 0 {
        return Vec::new();
    }

    let group_len = groups.len();

    // ============================================================================
    // FIX #1: Early exit if mass reveal is disabled - DON'T RUN DFS AT ALL
    // ============================================================================
    // If reveal tokens are too many, reveal becomes noise - just return simple modifiers
    // This is the KEY stop-gap that prevents DFS from running unnecessarily
    let reveal_tokens_count = groups.iter().filter(|g| g.token.reveal_count > 0).count();
    if use_approximation && reveal_tokens_count >= MASS_REVEAL_DISABLE_THRESHOLD {
        // reveal = шум → просто верни одиночные модификаторы без DFS
        let total_count: usize = groups.iter().map(|g| g.count).sum();
        let total_count_f64 = total_count as f64;
        let mut result = Vec::new();

        for (group_idx, group) in groups.iter().enumerate() {
            if group.token.is_fail {
                continue;
            }

            let probability = group.count as f64 / total_count_f64;
            let available_count = total_count.saturating_sub(1);

            // Build minimal state for cache key - simplified version
            // We just need a valid cache key, exact state doesn't matter since reveal is disabled
            let state2 = {
                let mut s2 = 0u128;
                for i in 0..group_len.min(32) {
                    if i < groups.len() {
                        let count = if i == group_idx {
                            groups[i].count.saturating_sub(1).min(7) as u8
                        } else {
                            groups[i].count.min(7) as u8
                        };
                        s2 = set_available_count(s2, i, count);
                    }
                }
                s2
            };

            let available_mask = {
                let mut mask = 0u32;
                for i in 0..group_len.min(32) {
                    if i < groups.len() && (i != group_idx || groups[i].count > 1) {
                        mask |= 1u32 << i;
                    }
                }
                mask
            };
            let state1 = (available_mask as u128) | (0u128 << 32);

            result.push(ChaosOddsCacheItem {
                modifier: group.modifier,
                probability,
                available_count,
                state1,
                state2,
                pending_reveal: 0,
            });
        }

        return result;
    }

    // ============================================================================
    // FIX #3: Filter bless/curse BEFORE DFS to reduce branching
    // ============================================================================
    // In ultra-aggressive mode, remove bless/curse completely to reduce branching by 5-10x
    let total_tokens: usize = groups.iter().map(|g| g.count).sum();
    let is_ultra_aggressive = use_approximation && total_tokens >= ULTRA_AGGRESSIVE_BAG_THRESHOLD;

    // Filter bless/curse if in ultra-aggressive mode
    // Create filtered groups vector if needed
    let filtered_groups_vec: Vec<ChaosOddsGroup> = if is_ultra_aggressive {
        // Remove bless/curse tokens completely in ultra-aggressive mode
        groups
            .iter()
            .filter(|g| g.token.token_type != "bless" && g.token.token_type != "curse")
            .cloned()
            .collect()
    } else {
        groups.to_vec()
    };

    // Use filtered groups if filtering happened, otherwise use original
    // Store filtered groups in a variable that lives long enough
    let (groups_to_use, group_len_new): (&[ChaosOddsGroup], usize) =
        if is_ultra_aggressive && filtered_groups_vec.len() < groups.len() {
            (&filtered_groups_vec, filtered_groups_vec.len())
        } else {
            (&groups, group_len)
        };
    let groups = groups_to_use;
    let group_len = group_len_new; // Update group_len after filtering

    // Build base available counts
    let base_available = groups_to_available_map(groups);
    let base_available_counts_array = {
        let mut arr = [0u8; 32];
        for (i, &count) in base_available.iter().enumerate().take(32) {
            arr[i] = count.min(7);
        }
        arr
    };
    let base_state2 = pack_available_counts(&base_available_counts_array);

    // Pre-compute token type flags
    let group_is_frost: Vec<bool> = groups
        .iter()
        .map(|g| g.token.token_type == "frost")
        .collect();

    // Initialize cache
    let mut cache: Vec<ChaosOddsCacheItem> = Vec::new();

    // Build cache map for deduplication
    let mut final_cache_map: FxHashMap<crate::util::cache::CacheKey, usize> = FxHashMap::default();
    let mut temp_items: Vec<(crate::util::cache::CacheKey, ChaosOddsCacheItem)> = Vec::new();
    for item in cache.drain(..) {
        let key = build_cache_key(
            item.state1,
            item.state2,
            item.available_count,
            item.modifier,
            0,
        );
        temp_items.push((key, item));
    }

    for (key, item) in temp_items {
        if let Some(&existing_idx) = final_cache_map.get(&key) {
            cache[existing_idx].probability += item.probability;
        } else {
            let idx = cache.len();
            cache.push(item);
            final_cache_map.insert(key, idx);
        }
    }

    // Prepare root states for ALL tokens (not just reveal tokens)
    // FIX #2: If mass reveal is disabled, set pending = 0 to prevent DFS
    let mut roots: Vec<(u128, u128, i16, usize, f64)> = Vec::new();
    let total_count: usize = groups.iter().map(|g| g.count).sum();
    let total_count_reciprocal = 1.0 / (total_count as f64);

    // Re-check reveal_tokens_count for roots (may have changed after filtering)
    let reveal_tokens_count_for_roots = groups.iter().filter(|g| g.token.reveal_count > 0).count();
    let mass_reveal_disabled =
        use_approximation && reveal_tokens_count_for_roots >= MASS_REVEAL_DISABLE_THRESHOLD;

    for (group_idx, group) in groups.iter().enumerate() {
        if group.token.is_fail {
            continue;
        }

        let state2 = dec_available_count(base_state2, group_idx);
        let available_mask = {
            let mut mask = 0u32;
            for i in 0..group_len.min(32) {
                if get_available_count(state2, i) > 0 {
                    mask |= 1u32 << i;
                }
            }
            mask
        };
        let state1 = (available_mask as u128) | (0u128 << 32);

        let probability = group.count as f64 * total_count_reciprocal;
        let modifier = group.modifier;

        // FIX #2: If mass reveal is disabled, set pending = 0 to prevent DFS
        let pending = if mass_reveal_disabled {
            0
        } else {
            group.token.reveal_count
        };

        roots.push((state1, state2, modifier, pending, probability));
    }

    if roots.is_empty() {
        return cache;
    }

    // Process with DFS
    let cache_items: Vec<ChaosOddsCacheItem> = cache.iter().cloned().collect();
    let mut dfs_cache: FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem> = {
        let mut map = FxHashMap::default();
        for item in &cache_items {
            let key = build_cache_key(
                item.state1,
                item.state2,
                item.available_count,
                item.modifier,
                0,
            );
            map.insert(key, item.clone());
        }
        map
    };

    process_reveal_tokens_dfs(
        &roots,
        &groups,
        &group_is_frost,
        group_len,
        revealed_frost_count,
        use_approximation,
        &mut dfs_cache,
    );

    // Merge results
    for (key, item) in dfs_cache {
        if let Some(&existing_idx) = final_cache_map.get(&key) {
            cache[existing_idx].probability += item.probability;
        } else {
            let idx = cache.len();
            cache.push(item);
            final_cache_map.insert(key, idx);
        }
    }

    cache
}
