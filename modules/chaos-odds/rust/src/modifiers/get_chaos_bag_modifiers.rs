use rustc_hash::FxHashMap;
use smallvec::SmallVec;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken, Counts};
use crate::util::cache::{build_cache_key, CacheKey};
use crate::util::groups::{build_groups, groups_to_available_map};
use crate::util::math::multinomial;

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

    // Build base available map template (full bag) - reuse for cloning
    let base_available = groups_to_available_map(&groups);

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

        let mut map = base_available.clone();
        if map[group_idx] > 0 {
            map[group_idx] -= 1;
        }

        let mut reveal_map = Counts::with_capacity(group_len);
        reveal_map.resize(group_len, 0);

        cache.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_map: map,
            available_count: total_tokens.saturating_sub(1),
            reveal_map,
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
    let mut cache_map: FxHashMap<CacheKey, ChaosOddsCacheItem> =
        FxHashMap::with_capacity_and_hasher(estimated_capacity, Default::default());
    let mut final_cache_map: FxHashMap<CacheKey, ChaosOddsCacheItem> =
        FxHashMap::with_capacity_and_hasher(estimated_capacity, Default::default());

    // Seed final_cache_map with existing cache entries (deduplicated)
    for item in cache.drain(..) {
        let key = build_cache_key(&item.reveal_map, item.available_count, item.modifier, 0);
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

        let mut map = base_available.clone();
        if map[group_idx] > 0 {
            map[group_idx] -= 1;
        }

        let probability = group.count as f64 / total_count as f64;
        let modifier = group.modifier as i16;

        let mut reveal_map = Counts::with_capacity(group_len);
        reveal_map.resize(group_len, 0);

        items_to_process.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_map: map,
            available_count: total_count.saturating_sub(1),
            reveal_map,
            pending_reveal: group.token.reveal_count,
        });
    }

    let mut multinomial_cache: FxHashMap<SmallVec<[usize; 32]>, u64> = FxHashMap::default();

    while let Some(mut item) = items_to_process.pop() {
        if item.pending_reveal == 0 {
            // Final state: apply multinomial for permutations of the same reveal multiset
            // Collect non-zero values directly - multinomial will sort internally
            let mut counts: SmallVec<[usize; 32]> = item
                .reveal_map
                .iter()
                .copied()
                .filter(|&v| v > 0)
                .map(|v| v as usize)
                .collect();
            if !counts.is_empty() {
                counts.sort_unstable();

                let combinations = *multinomial_cache
                    .entry(counts.clone())
                    .or_insert_with(|| multinomial(&counts));
                item.probability *= combinations as f64;
            }

            let key = build_cache_key(&item.reveal_map, item.available_count, item.modifier, 0);
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
            // Use available_map from item (it's already computed and cached)
            let available = item.available_map[group_idx] as usize;

            if available == 0 {
                continue;
            }

            let token = &group.token;

            // Use pre-computed flag instead of string comparison
            if token.is_fail || (group_is_frost[group_idx] && revealed_frost_count == 1) {
                continue;
            }

            // Modify state in-place (backtracking pattern)
            let old_available = item.available_map[group_idx];
            let old_reveal = item.reveal_map[group_idx];

            if item.available_map[group_idx] > 0 {
                item.available_map[group_idx] -= 1;
            }
            item.reveal_map[group_idx] = item.reveal_map[group_idx].saturating_add(1);

            let next_available_count = item.available_count.saturating_sub(1);
            let next_pending_reveal = item.pending_reveal.saturating_sub(1) + token.reveal_count;
            let step_probability =
                item.probability * (available as f64 / item.available_count as f64);
            let expected_modifier = item.modifier + (group.modifier as i16);

            let key = build_cache_key(
                &item.reveal_map,
                next_available_count,
                expected_modifier,
                next_pending_reveal,
            );

            // Early deduplication: check before creating new item (optimization)
            use std::collections::hash_map::Entry;
            match cache_map.entry(key) {
                Entry::Occupied(mut e) => {
                    e.get_mut().probability += step_probability;
                    e.get_mut().pending_reveal =
                        e.get_mut().pending_reveal.max(next_pending_reveal);
                }
                Entry::Vacant(e) => {
                    // Clone only once for the new item - use item.available_map which is already correct
                    // SmallVec clone is optimized for stack-allocated data (typically < 32 elements)
                    let new_item = ChaosOddsCacheItem {
                        modifier: expected_modifier,
                        probability: step_probability,
                        available_map: item.available_map.clone(),
                        available_count: next_available_count,
                        reveal_map: item.reveal_map.clone(),
                        pending_reveal: next_pending_reveal,
                    };

                    // Insert and clone in one step - avoid double clone
                    let item_ref = e.insert(new_item);
                    items_to_process.push(item_ref.clone());
                }
            }

            // Restore original state (undo/backtrack)
            item.available_map[group_idx] = old_available;
            item.reveal_map[group_idx] = old_reveal;
        }
    }

    cache
}
