use rustc_hash::FxHashMap;
use smallvec::SmallVec;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, inc_reveal, pack_available_counts,
    unpack_reveal, CacheKey,
};
use crate::util::groups::{build_groups, groups_to_available_map};
use crate::util::math::multinomial;

/// Build available_mask from packed available_counts - set bit if count > 0
/// For groups > 21, we need to use the original base_available array to check counts
#[inline(always)]
fn build_available_mask(available_counts: u64, group_len: usize) -> u32 {
    let mut mask = 0u32;
    for i in 0..group_len.min(32) {
        if get_available_count(available_counts, i) > 0 {
            mask |= 1u32 << i;
        }
    }
    mask
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
            arr[i] = count.min(7); // Clamp to max 7 for u64 packing (3 bits per group)
        }
        arr
    };
    let base_available_counts = pack_available_counts(&base_available_counts_array);

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

        // Build available_mask: decrement count for current group
        let counts = dec_available_count(base_available_counts, group_idx);
        let available_mask = build_available_mask(counts, group_len);

        cache.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_mask,
            available_counts: counts, // u64 is Copy
            available_count: total_tokens.saturating_sub(1),
            reveal: 0u128, // No reveals for regular tokens
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
    let mut final_cache_map: FxHashMap<CacheKey, ChaosOddsCacheItem> =
        FxHashMap::with_capacity_and_hasher(estimated_capacity, Default::default());

    // Seed final_cache_map with existing cache entries (deduplicated)
    for item in cache.drain(..) {
        let key = build_cache_key(item.reveal, item.available_count, item.modifier, 0);
        if let Some(existing) = final_cache_map.get_mut(&key) {
            existing.probability += item.probability;
        } else {
            final_cache_map.insert(key, item);
        }
    }

    // Rebuild cache from deduplicated items - avoid cloning, use drain or into_values
    cache.extend(final_cache_map.values().cloned());

    let mut items_to_process: Vec<ChaosOddsCacheItem> = Vec::new();
    let total_count: usize = groups.iter().map(|g| g.count).sum();

    for (group_idx, group) in reveal_groups {
        if group.token.is_fail {
            continue;
        }

        // Build available_mask: decrement count for current group
        let counts = dec_available_count(base_available_counts, group_idx);
        let available_mask = build_available_mask(counts, group_len);

        let probability = group.count as f64 / total_count as f64;
        let modifier = group.modifier as i16;

        items_to_process.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_mask,
            available_counts: counts, // Copy array (no allocation)
            available_count: total_count.saturating_sub(1),
            reveal: 0u128, // Start with no reveals
            pending_reveal: group.token.reveal_count,
        });
    }

    let mut multinomial_cache: FxHashMap<SmallVec<[usize; 32]>, u64> = FxHashMap::default();

    while let Some(mut item) = items_to_process.pop() {
        if item.pending_reveal == 0 {
            // Final state: apply multinomial for permutations of the same reveal multiset
            // Unpack reveal counts from u128
            let reveal_counts = unpack_reveal(item.reveal, group_len);
            if !reveal_counts.is_empty() {
                let mut counts: SmallVec<[usize; 32]> =
                    reveal_counts.iter().map(|&v| v as usize).collect();
                counts.sort_unstable();

                let combinations = *multinomial_cache
                    .entry(counts.clone())
                    .or_insert_with(|| multinomial(&counts));
                item.probability *= combinations as f64;
            }

            let key = build_cache_key(item.reveal, item.available_count, item.modifier, 0);
            if let Some(existing) = final_cache_map.get_mut(&key) {
                existing.probability += item.probability;
                continue;
            }

            // Move item into final_cache_map, clone only for cache
            let item_clone = item.clone();
            final_cache_map.insert(key, item);
            cache.push(item_clone);
            continue;
        }

        if item.available_count == 0 {
            continue;
        }

        for (group_idx, group) in groups.iter().enumerate() {
            // Check if group is available using bitmask - O(1) operation
            if (item.available_mask & (1u32 << group_idx)) == 0 {
                continue;
            }

            let token = &group.token;

            // Use pre-computed flag instead of string comparison
            if token.is_fail || (group_is_frost[group_idx] && revealed_frost_count == 1) {
                continue;
            }

            // Get available count from item's current counts
            let available = get_available_count(item.available_counts, group_idx) as usize;

            // Modify state in-place (backtracking pattern)
            let old_available_mask = item.available_mask;
            let old_available_counts = item.available_counts;
            let old_reveal = item.reveal;

            // Decrement count: if count becomes 0, clear the bit
            item.available_counts = dec_available_count(item.available_counts, group_idx);
            if get_available_count(item.available_counts, group_idx) == 0 {
                item.available_mask &= !(1u32 << group_idx);
            }
            // Increment reveal count using packed u128
            item.reveal = inc_reveal(item.reveal, group_idx);

            let next_available_count = item.available_count.saturating_sub(1);
            let next_pending_reveal = item.pending_reveal.saturating_sub(1) + token.reveal_count;
            let step_probability =
                item.probability * (available as f64 / item.available_count as f64);
            let expected_modifier = item.modifier + (group.modifier as i16);

            let key = build_cache_key(
                item.reveal,
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

                    // Create new item and push directly to queue - no clone!
                    let new_item = ChaosOddsCacheItem {
                        modifier: expected_modifier,
                        probability: step_probability,
                        available_mask: item.available_mask, // u32 is Copy
                        available_counts: item.available_counts, // u64 is Copy
                        available_count: next_available_count,
                        reveal: item.reveal, // u128 is Copy
                        pending_reveal: next_pending_reveal,
                    };

                    // Push directly without clone - major optimization
                    items_to_process.push(new_item);
                }
            }

            // Restore original state (undo/backtrack)
            item.available_mask = old_available_mask; // u32 is Copy
            item.available_counts = old_available_counts; // u64 is Copy
            item.reveal = old_reveal; // u128 is Copy
        }
    }

    cache
}
