use rustc_hash::FxHashMap;
use smallvec::SmallVec;

use crate::types::{ChaosBagModifier, ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken, Counts};
use crate::util::cache::{build_cache_key, CacheKey};
use crate::util::groups::{build_groups, groups_to_available_map};
use crate::util::math::multinomial;

/// Main entry point that mirrors the TypeScript `getChaosBagModifiers` logic
/// without splitting the helpers. Returns only {modifier, probability}.
pub fn get_chaos_bag_modifiers(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
) -> Vec<ChaosBagModifier> {
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
        return cache
            .into_iter()
            .map(|item| ChaosBagModifier {
                modifier: item.modifier,
                probability: item.probability,
            })
            .collect();
    }

    let mut cache_map: FxHashMap<CacheKey, ChaosOddsCacheItem> = FxHashMap::default();
    let mut final_cache_map: FxHashMap<CacheKey, ChaosOddsCacheItem> = FxHashMap::default();

    // Seed final_cache_map with existing cache entries (deduplicated)
    for item in cache.drain(..) {
        let key = build_cache_key(&item.reveal_map, item.available_count, item.modifier, 0);
        if let Some(existing) = final_cache_map.get_mut(&key) {
            existing.probability += item.probability;
        } else {
            final_cache_map.insert(key, item);
        }
    }

    // Rebuild cache from deduplicated items
    for item in final_cache_map.values().cloned() {
        cache.push(item);
    }

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

    // Profiling counters (currently unused, kept for future profiling/debugging)
    let mut _multinomial_calls = 0u64;
    let mut _hashmap_clones = 0u64;
    let mut _cache_key_builds = 0u64;

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
                _multinomial_calls += 1;
                let combinations = *multinomial_cache
                    .entry(counts.clone())
                    .or_insert_with(|| multinomial(&counts));
                item.probability *= combinations as f64;
            }

            _cache_key_builds += 1;
            let key = build_cache_key(&item.reveal_map, item.available_count, item.modifier, 0);
            if let Some(existing) = final_cache_map.get_mut(&key) {
                existing.probability += item.probability;
                continue;
            }

            cache.push(item.clone());
            final_cache_map.insert(key, item);
            continue;
        }

        if item.available_count == 0 {
            continue;
        }

        for (group_idx, group) in groups.iter().enumerate() {
            let available = item.available_map[group_idx] as usize;

            if available == 0 {
                continue;
            }

            let token = &group.token;

            if token.is_fail || (token.token_type == "frost" && revealed_frost_count == 1) {
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

            _cache_key_builds += 1;
            let key = build_cache_key(
                &item.reveal_map,
                next_available_count,
                expected_modifier,
                next_pending_reveal,
            );

            if let Some(existing) = cache_map.get_mut(&key) {
                existing.probability += step_probability;
                existing.pending_reveal = existing.pending_reveal.max(next_pending_reveal);
            } else {
                // Clone only once for the new item
                _hashmap_clones += 1;
                let new_item = ChaosOddsCacheItem {
                    modifier: expected_modifier,
                    probability: step_probability,
                    available_map: item.available_map.clone(),
                    available_count: next_available_count,
                    reveal_map: item.reveal_map.clone(),
                    pending_reveal: next_pending_reveal,
                };

                cache_map.insert(key, new_item.clone());
                items_to_process.push(new_item);
            }

            // Restore original state (undo/backtrack)
            item.available_map[group_idx] = old_available;
            item.reveal_map[group_idx] = old_reveal;
        }
    }

    cache
        .into_iter()
        .map(|item| ChaosBagModifier {
            modifier: item.modifier,
            probability: item.probability,
        })
        .collect()
}
