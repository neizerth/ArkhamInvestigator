// Optimized version of get_chaos_bag_modifiers for single skill/difficulty calculation
// Filters modifiers on-the-fly to avoid creating unnecessary cache items
// Returns only modifiers that satisfy the condition: skill_value + modifier + revealed_modifier >= difficulty

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, get_reveal, inc_reveal,
    pack_available_counts, set_available_count,
};
use crate::util::groups::{build_groups, groups_to_available_map};
use rustc_hash::FxHashMap;

/// Maximum number of DFS iterations (safety limit to prevent infinite loops)
const MAX_DFS_ITERATIONS: usize = 5_000;

/// Initial capacity for DFS stack (pre-allocated to avoid reallocations)
const DFS_STACK_INITIAL_CAPACITY: usize = 5_000;

/// Maximum number of unique states to track in deduplication
const MAX_SEEN_STATES: usize = 5_000;

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

/// DFS state for processing
#[derive(Clone, Copy)]
struct DFSState {
    counts: u128,  // Packed counts (4 bits per count × 20 groups = 80 bits)
    pending: u8,   // Remaining reveals needed
    modifier: i16, // Current modifier
    prob: f64,     // Current probability
    reveal: u128,  // Packed reveal counts
}

/// Add modifier to cache if it satisfies required_modifier condition
/// Helper function to avoid code duplication
/// Condition: (skill + modifier + revealed >= difficulty) || (difficulty == 0)
#[inline]
fn add_modifier_to_cache_if_satisfies(
    counts_packed: u128,
    reveal: u128,
    modifier: i16,
    prob: f64,
    effective_group_len: usize,
    required_modifier: i16,
    difficulty: u16,
    cache: &mut FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem>,
) {
    // If difficulty == 0, accept any modifier
    // Otherwise, check: modifier >= required_modifier (i.e., skill + modifier + revealed >= difficulty)
    if difficulty != 0 && modifier < required_modifier {
        return;
    }

    let total = total_packed(counts_packed, effective_group_len) as usize;
    let counts = unpack_counts(counts_packed, effective_group_len);

    // Rebuild state2 and available_mask from unpacked counts
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
    let key = build_cache_key(state1_rebuilt, state2_rebuilt, total, modifier, 0);

    if let Some(existing) = cache.get_mut(&key) {
        existing.probability += prob;
    } else {
        cache.insert(
            key,
            ChaosOddsCacheItem {
                modifier,
                probability: prob,
                available_count: total,
                state1: state1_rebuilt,
                state2: state2_rebuilt,
                pending_reveal: 0,
            },
        );
    }
}

/// Process reveal tokens using DFS with early filtering
/// Only adds to cache modifiers that satisfy: (skill_value + modifier + revealed_modifier >= difficulty) || (difficulty == 0)
fn process_reveal_tokens_dfs_filtered(
    roots: &[(u128, u128, i16, usize, f64)], // (state1, state2, modifier, pending_reveal, probability)
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    group_len: usize,
    revealed_frost_count: usize,
    required_modifier: i16, // Minimum modifier needed: difficulty - skill_value - revealed_modifier
    difficulty: u16,
    cache: &mut FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem>,
) {
    if roots.is_empty() || group_len == 0 {
        return;
    }

    let effective_group_len = group_len.min(20);

    // Precompute group metadata to avoid lookups in hot loop
    let group_modifiers: Vec<i16> = groups.iter().map(|g| g.modifier).collect();
    let group_reveal_counts: Vec<u8> = groups
        .iter()
        .map(|g| g.token.reveal_count.min(255) as u8)
        .collect();
    let group_is_fail: Vec<bool> = groups.iter().map(|g| g.token.is_fail).collect();

    // Precompute allowed group mask
    let mut allowed_groups = vec![false; effective_group_len];
    for i in 0..effective_group_len {
        allowed_groups[i] = !group_is_fail[i] && !(group_is_frost[i] && revealed_frost_count == 1);
    }

    // Initialize stack with root states
    let mut stack: Vec<DFSState> = Vec::with_capacity(DFS_STACK_INITIAL_CAPACITY);
    for (state1, state2, modifier, pending, prob) in roots {
        let mut counts = [0u8; 20];
        for i in 0..effective_group_len {
            counts[i] = get_available_count(*state2, i);
        }
        let counts_packed = pack_counts(&counts, effective_group_len);
        let reveal = get_reveal(*state1);
        let pending_u8 = (*pending).min(255) as u8;

        // If pending=0, check if modifier satisfies condition and add to cache
        if pending_u8 == 0 {
            add_modifier_to_cache_if_satisfies(
                counts_packed,
                reveal,
                *modifier,
                *prob,
                effective_group_len,
                required_modifier,
                difficulty,
                cache,
                    );
        } else {
            stack.push(DFSState {
                counts: counts_packed,
                pending: pending_u8,
                modifier: *modifier,
                prob: *prob,
                reveal,
            });
        }
    }

    // DFS processing with stack and deduplication
    let mut seen: FxHashMap<(u128, u8, i16), f64> = FxHashMap::default();
    let mut iteration = 0;

    while let Some(state) = stack.pop() {
        iteration += 1;
        if iteration > MAX_DFS_ITERATIONS {
            break;
        }

        // Deduplication
        let state_key = (state.counts, state.pending, state.modifier);

        if let Some(existing_prob) = seen.get_mut(&state_key) {
            // Merge probabilities for duplicate states
            *existing_prob += state.prob;
            continue;
        } else {
            // Limit total number of unique states to prevent explosion
            if seen.len() >= MAX_SEEN_STATES {
                // Skip this state - we've hit the limit
                continue;
            }
            seen.insert(state_key, state.prob);
        }

        // CRITICAL: Hard stop when pending == 0
        if state.pending == 0 {
            add_modifier_to_cache_if_satisfies(
                state.counts,
                state.reveal,
                state.modifier,
                state.prob,
                effective_group_len,
                required_modifier,
                difficulty,
                cache,
                    );
            continue;
        }

        let total_left = total_packed(state.counts, effective_group_len);
        if total_left == 0 {
            continue;
        }

        // Process all possible draws
        for i in 0..effective_group_len {
            if !allowed_groups[i] {
                continue;
            }

            let count = get_count_packed(state.counts, i);
            if count == 0 {
                continue;
            }

            // Create next state
            let next_counts = dec_count_packed(state.counts, i);
            let next_modifier = state.modifier.saturating_add(group_modifiers[i]);

            // Handle reveal_count - use original reveal_count without approximation
            let reveal_add = group_reveal_counts[i];

            let new_pending = state.pending.saturating_sub(1).saturating_add(reveal_add);

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
            });
        }
    }
}

/// Optimized function to get modifiers for a specific skill/difficulty combination
/// Returns only modifiers that satisfy: (skill_value + modifier + revealed_modifier >= difficulty) || (difficulty == 0)
///
/// # Arguments
/// * `tokens` - List of tokens in the chaos bag
/// * `revealed_frost_count` - Number of revealed frost tokens
/// * `skill_value` - Skill value (0-100)
/// * `difficulty` - Difficulty value (0-100)
/// * `revealed_modifier` - Sum of modifiers from already revealed tokens
pub fn get_chaos_bag_item_modifiers(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
    skill_value: u16,
    difficulty: u16,
    revealed_modifier: i16,
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

    // Build base available counts
    let base_available = groups_to_available_map(&groups);
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

    // Calculate required modifier: skill + modifier + revealed >= difficulty
    // => modifier >= difficulty - skill - revealed
    let skill_i16 = skill_value as i16;
    let difficulty_i16 = difficulty as i16;
    let required_modifier = difficulty_i16 - skill_i16 - revealed_modifier;

    // Prepare root states for ALL tokens
    let mut roots: Vec<(u128, u128, i16, usize, f64)> = Vec::new();
    let total_count: usize = groups.iter().map(|g| g.count).sum();
    let total_count_reciprocal = 1.0 / (total_count as f64);

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
        let pending = group.token.reveal_count;

        roots.push((state1, state2, modifier, pending, probability));
    }

    if roots.is_empty() {
        return Vec::new();
    }

    // Process with DFS and add only satisfying modifiers to cache
    let mut dfs_cache: FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem> =
        FxHashMap::default();

    process_reveal_tokens_dfs_filtered(
        &roots,
        &groups,
        &group_is_frost,
        group_len,
        revealed_frost_count,
        required_modifier,
        difficulty,
        &mut dfs_cache,
    );

    // Convert cache to Vec
    dfs_cache.into_values().collect()
}
