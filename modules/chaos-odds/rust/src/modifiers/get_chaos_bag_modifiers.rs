use rustc_hash::FxHashMap;
use smallvec::SmallVec;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, get_available_mask, inc_reveal,
    pack_available_counts, pack_reveal_as_multinomial_key, set_available_mask, unpack_reveal,
    CacheKey,
};
use crate::util::groups::{build_groups, groups_to_available_map};
use crate::util::math::multinomial;

/// Build available_mask from packed state2 - set bit if count > 0
#[inline(always)]
fn build_available_mask(state2: u128, group_len: usize) -> u32 {
    let mut mask = 0u32;
    for i in 0..group_len.min(21) {
        if get_available_count(state2, i) > 0 {
            mask |= 1u32 << i;
        }
    }
    mask
}

/// Build state1 from available_mask and reveal
#[inline(always)]
fn build_state1(available_mask: u32, reveal: u128) -> u128 {
    (available_mask as u128) | (reveal << 32)
}

/// Main entry point that mirrors the TypeScript `getChaosBagModifiers` logic
/// Returns ChaosOddsCacheItem with modifier and probability.
pub fn get_chaos_bag_modifiers(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
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

    // Build base available counts - immutable, shared across all items
    let base_available = groups_to_available_map(&groups);
    let base_available_counts_array = {
        let mut arr = [0u8; 32];
        for (i, &count) in base_available.iter().enumerate().take(32) {
            arr[i] = count.min(7); // Clamp to max 7 for u128 packing (3 bits per group)
        }
        arr
    };
    let base_state2 = pack_available_counts(&base_available_counts_array);

    // Pre-compute token type flags to avoid string comparisons in hot loop
    let group_is_frost: Vec<bool> = groups
        .iter()
        .map(|g| g.token.token_type == "frost")
        .collect();

    // ---------- Regular tokens (reveal_count == 0) ----------
    let mut cache: Vec<ChaosOddsCacheItem> = Vec::new();
    let total_f64 = total_tokens as f64;

    for (group_idx, group) in groups.iter().enumerate() {
        if group.token.reveal_count > 0 {
            continue;
        }

        let probability = group.count as f64 / total_f64;
        let modifier = group.modifier as i16;

        // Build state2: decrement count for current group
        let state2 = dec_available_count(base_state2, group_idx);
        let available_mask = build_available_mask(state2, group_len);
        let state1 = build_state1(available_mask, 0u128);

        cache.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_count: total_tokens.saturating_sub(1),
            state1, // Combined state: mask + reveal
            state2, // Available counts
            pending_reveal: 0,
        });
    }

    // ---------- Reveal tokens (reveal_count > 0) ----------
    let reveal_groups: Vec<(usize, &ChaosOddsGroup)> = groups
        .iter()
        .enumerate()
        .filter(|(_, g)| g.token.reveal_count > 0)
        .collect();

    if reveal_groups.is_empty() {
        return cache;
    }

    // Pre-allocate hash maps with estimated capacity to reduce rehashing
    // Use total_tokens as estimate (total_count computed later)
    let estimated_capacity = (total_tokens * 4).min(10000);
    // HashMap stores only probability, not full state - major optimization
    let mut cache_map: FxHashMap<CacheKey, f64> =
        FxHashMap::with_capacity_and_hasher(estimated_capacity, Default::default());
    // Use index mapping instead of storing full items - eliminates clone()
    let mut final_cache_map: FxHashMap<CacheKey, usize> =
        FxHashMap::with_capacity_and_hasher(estimated_capacity, Default::default());

    // Seed final_cache_map with existing cache entries (deduplicated)
    // First pass: collect items and build index mapping
    let mut temp_items: Vec<(CacheKey, ChaosOddsCacheItem)> = Vec::new();
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

    // Second pass: build cache and index map, merge duplicates
    for (key, item) in temp_items {
        if let Some(&existing_idx) = final_cache_map.get(&key) {
            // Update probability directly in cache - no clone!
            cache[existing_idx].probability += item.probability;
        } else {
            // Add new item to cache and store index - no clone!
            let idx = cache.len();
            cache.push(item);
            final_cache_map.insert(key, idx);
        }
    }

    // Lightweight stack for DFS - store only primitives, not full structs
    // This eliminates overhead of push/pop on large structs
    struct DFSState {
        state1: u128,
        state2: u128,
        available_count: usize,
        modifier: i16,
        pending_reveal: usize,
        probability: f64,
    }

    let mut items_to_process: Vec<DFSState> = Vec::new();
    let total_count: usize = groups.iter().map(|g| g.count).sum();

    for (group_idx, group) in reveal_groups {
        if group.token.is_fail {
            continue;
        }

        // Build state2: decrement count for current group
        let state2 = dec_available_count(base_state2, group_idx);
        let available_mask = build_available_mask(state2, group_len);
        let state1 = build_state1(available_mask, 0u128);

        let probability = group.count as f64 / total_count as f64;
        let modifier = group.modifier as i16;

        items_to_process.push(DFSState {
            state1,
            state2,
            available_count: total_count.saturating_sub(1),
            modifier,
            pending_reveal: group.token.reveal_count,
            probability,
        });
    }

    // Use u128 as key instead of SmallVec - eliminates sorting and allocation in hot loop
    let mut multinomial_cache: FxHashMap<u128, u64> = FxHashMap::default();

    // Precompute probability table for all possible (available, available_count) combinations
    // This eliminates ALL divisions in the hot loop - only multiplications remain
    // Structure: prob_table[group_idx][available_count][available] = available / available_count
    const MAX_GROUPS: usize = 32;
    const MAX_AVAILABLE: usize = 7; // Max tokens per group in state2
    const MAX_AVAILABLE_COUNT: usize = 100; // Reasonable upper bound for available_count

    // Use Vec of Vecs for flexibility (could be optimized to fixed array if needed)
    // Structure: prob_table[group_idx][available_count - 1][available] = available / available_count
    let mut prob_table: Vec<Vec<[f64; MAX_AVAILABLE + 1]>> =
        Vec::with_capacity(group_len.min(MAX_GROUPS));

    for _group_idx in 0..group_len.min(MAX_GROUPS) {
        let mut group_probs = Vec::with_capacity(total_count.min(MAX_AVAILABLE_COUNT) + 1);

        // Precompute for all available_count values from 1 to total_count
        for available_count in 1..=total_count.min(MAX_AVAILABLE_COUNT) {
            let mut probs = [0f64; MAX_AVAILABLE + 1];
            let available_count_f64 = available_count as f64;

            // Precompute for all possible available values (0-7)
            for available in 0..=MAX_AVAILABLE.min(available_count) {
                probs[available] = available as f64 / available_count_f64;
            }

            group_probs.push(probs);
        }

        // Pad with zeros for available_count > total_count (shouldn't happen, but safety)
        while group_probs.len() <= MAX_AVAILABLE_COUNT {
            group_probs.push([0f64; MAX_AVAILABLE + 1]);
        }

        prob_table.push(group_probs);
    }

    // Pad prob_table to MAX_GROUPS for safe indexing
    while prob_table.len() < MAX_GROUPS {
        prob_table.push(vec![[0f64; MAX_AVAILABLE + 1]; MAX_AVAILABLE_COUNT + 1]);
    }

    while let Some(mut item) = items_to_process.pop() {
        if item.pending_reveal == 0 {
            // Final state: apply multinomial for permutations of the same reveal multiset
            // Pack reveal as sorted u128 key - NO SmallVec allocation, NO sorting in hot loop!
            let multinomial_key = pack_reveal_as_multinomial_key(item.state1, group_len);
            let mut final_probability = item.probability;
            if multinomial_key != 0 {
                let combinations = *multinomial_cache.entry(multinomial_key).or_insert_with(|| {
                    // Only unpack and compute multinomial on cache miss
                    let reveal_counts = unpack_reveal(item.state1, group_len);
                    let counts: SmallVec<[usize; 32]> =
                        reveal_counts.iter().map(|&v| v as usize).collect();
                    multinomial(&counts)
                });
                final_probability *= combinations as f64;
            }

            let key = build_cache_key(
                item.state1,
                item.state2,
                item.available_count,
                item.modifier,
                0,
            );
            if let Some(&existing_idx) = final_cache_map.get(&key) {
                // Update probability directly in cache - no clone!
                cache[existing_idx].probability += final_probability;
                continue;
            }

            // Add item to cache and store index - no clone!
            let idx = cache.len();
            cache.push(ChaosOddsCacheItem {
                modifier: item.modifier,
                probability: final_probability,
                available_count: item.available_count,
                state1: item.state1,
                state2: item.state2,
                pending_reveal: 0,
            });
            final_cache_map.insert(key, idx);
            continue;
        }

        if item.available_count == 0 {
            continue;
        }

        for (group_idx, group) in groups.iter().enumerate() {
            // Check if group is available using bitmask from state1 - O(1) operation
            let available_mask = get_available_mask(item.state1);
            if (available_mask & (1u32 << group_idx)) == 0 {
                continue;
            }

            let token = &group.token;

            // Use pre-computed flag instead of string comparison
            if token.is_fail || (group_is_frost[group_idx] && revealed_frost_count == 1) {
                continue;
            }

            // Get available count from state2 - pure bit operation, no array access
            let available = get_available_count(item.state2, group_idx) as usize;

            // Check conditions once for fast path (most common case)
            // Fast path: no bounds checks, direct table lookup
            let use_fast_path = group_idx < MAX_GROUPS
                && item.available_count > 0
                && item.available_count <= MAX_AVAILABLE_COUNT
                && available <= MAX_AVAILABLE;

            // Modify state in-place (backtracking pattern)
            let old_state1 = item.state1;
            let old_state2 = item.state2;

            // Decrement count in state2: if count becomes 0, clear the bit in mask
            item.state2 = dec_available_count(item.state2, group_idx);
            let new_mask = if get_available_count(item.state2, group_idx) == 0 {
                available_mask & !(1u32 << group_idx)
            } else {
                available_mask
            };
            // Increment reveal count in state1
            item.state1 = inc_reveal(set_available_mask(item.state1, new_mask), group_idx);

            let next_available_count = item.available_count.saturating_sub(1);
            let next_pending_reveal = item.pending_reveal.saturating_sub(1) + token.reveal_count;

            // Fast path: direct table lookup - NO CHECKS, NO DIVISION!
            // This eliminates all branching in the hot path for normal tokens
            let step_probability = if use_fast_path {
                // Unsafe indexing is safe here because we checked bounds above
                // This is the hot path - no conditionals, just multiplication
                item.probability * prob_table[group_idx][item.available_count - 1][available]
            } else {
                // Slow path: edge cases only (should be very rare)
                // Fallback with division for cases outside table bounds
                item.probability * (available as f64 / item.available_count as f64)
            };

            let expected_modifier = item.modifier + (group.modifier as i16);

            let key = build_cache_key(
                item.state1,
                item.state2,
                next_available_count,
                expected_modifier,
                next_pending_reveal,
            );

            // Early deduplication: check before creating new item (optimization)
            use std::collections::hash_map::Entry;
            match cache_map.entry(key) {
                Entry::Occupied(mut e) => {
                    // Only update probability in HashMap
                    *e.get_mut() += step_probability;
                }
                Entry::Vacant(e) => {
                    // Insert only probability in HashMap (not full state)
                    e.insert(step_probability);

                    // Push lightweight state to stack - no struct allocation!
                    items_to_process.push(DFSState {
                        state1: item.state1, // u128 is Copy
                        state2: item.state2, // u128 is Copy
                        available_count: next_available_count,
                        modifier: expected_modifier,
                        pending_reveal: next_pending_reveal,
                        probability: step_probability,
                    });
                }
            }

            // Restore original state (undo/backtrack)
            item.state1 = old_state1; // u128 is Copy
            item.state2 = old_state2; // u128 is Copy
        }
    }

    cache
}
