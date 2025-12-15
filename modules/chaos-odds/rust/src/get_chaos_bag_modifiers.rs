use std::collections::HashMap;

use crate::types::{ChaosBagModifier, ChaosOddsCacheItem, ChaosOddsToken};
use crate::util::cache::build_cache_key;
use crate::util::groups::{build_groups, groups_to_available_map};
use num_integer::multinomial;

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

    // Build initial available map (full bag)
    let mut available_map: HashMap<String, usize> = HashMap::new();
    for group in &groups {
        available_map.insert(group.group_index.clone(), group.count);
    }

    // ---------- Regular tokens (reveal_count == 0) ----------
    let mut cache: Vec<ChaosOddsCacheItem> = Vec::new();
    let total_f64 = total_tokens as f64;

    for group in &groups {
        if group.token.reveal_count > 0 {
            continue;
        }

        let probability = group.count as f64 / total_f64;
        let modifier = group.token.as_modifier();

        let mut map = available_map.clone();
        if let Some(entry) = map.get_mut(&group.group_index) {
            *entry = entry.saturating_sub(1);
        }

        cache.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_map: map,
            available_count: total_tokens.saturating_sub(1),
            reveal_map: HashMap::new(),
            pending_reveal: 0,
            is_fail: group.token.is_fail,
        });
    }

    // ---------- Reveal tokens (reveal_count > 0) ----------
    let reveal_groups: Vec<_> = groups
        .iter()
        .filter(|g| g.token.reveal_count > 0)
        .cloned()
        .collect();

    if reveal_groups.is_empty() {
        return cache
            .into_iter()
            .map(|item| ChaosBagModifier {
                modifier: item.modifier,
                probability: item.probability,
                is_fail: item.is_fail,
            })
            .collect();
    }

    let mut cache_map: HashMap<String, ChaosOddsCacheItem> = HashMap::new();
    let mut final_cache_map: HashMap<String, ChaosOddsCacheItem> = HashMap::new();

    // Seed final_cache_map with existing cache entries (deduplicated)
    for item in cache.drain(..) {
        let key = build_cache_key(&item.reveal_map, item.available_count, item.modifier);
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

    for group in &reveal_groups {
        if group.token.is_fail {
            continue;
        }

        let mut map = groups_to_available_map(&groups);
        if let Some(entry) = map.get_mut(&group.group_index) {
            *entry = entry.saturating_sub(1);
        }

        let probability = group.count as f64 / total_count as f64;
        let modifier = group.token.as_modifier();

        items_to_process.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_map: map,
            available_count: total_count.saturating_sub(1),
            reveal_map: HashMap::new(),
            pending_reveal: group.token.reveal_count,
            is_fail: false,
        });
    }

    let mut multinomial_cache: HashMap<Vec<usize>, usize> = HashMap::new();

    while let Some(mut item) = items_to_process.pop() {
        if item.pending_reveal == 0 {
            // Final state: apply multinomial for permutations of the same reveal multiset
            let counts = sorted_non_zero_values(&item.reveal_map);
            if !counts.is_empty() {
                let combinations = *multinomial_cache
                    .entry(counts.clone())
                    .or_insert_with(|| multinomial(&counts));
                item.probability *= combinations as f64;
            }

            let key = build_cache_key(&item.reveal_map, item.available_count, item.modifier);
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

        for group in &groups {
            let available = *item
                .available_map
                .get(&group.group_index)
                .unwrap_or(&0usize);

            if available == 0 {
                continue;
            }

            let token = &group.token;

            let is_fail =
                token.is_fail || (token.token_type == "frost" && revealed_frost_count == 1);

            let mut next_available_map = item.available_map.clone();
            if let Some(entry) = next_available_map.get_mut(&group.group_index) {
                *entry = entry.saturating_sub(1);
            }

            let next_available_count = item.available_count.saturating_sub(1);

            let mut next_reveal_map = item.reveal_map.clone();
            let entry = next_reveal_map
                .entry(group.group_index.clone())
                .or_insert(0);
            *entry += 1;

            let next_pending_reveal = item.pending_reveal.saturating_sub(1) + token.reveal_count;

            let step_probability =
                item.probability * (available as f64 / item.available_count as f64);

            let expected_modifier = item.modifier + token.as_modifier();

            let key = build_cache_key(&next_reveal_map, next_available_count, expected_modifier);

            if let Some(existing) = cache_map.get_mut(&key) {
                existing.probability += step_probability;
                existing.pending_reveal = existing.pending_reveal.max(next_pending_reveal);
                continue;
            }

            let new_item = ChaosOddsCacheItem {
                modifier: expected_modifier,
                probability: step_probability,
                available_map: next_available_map,
                available_count: next_available_count,
                reveal_map: next_reveal_map,
                pending_reveal: next_pending_reveal,
                is_fail,
            };

            cache_map.insert(key, new_item.clone());
            items_to_process.push(new_item);
        }
    }

    cache
        .into_iter()
        .map(|item| ChaosBagModifier {
            modifier: item.modifier,
            probability: item.probability,
            is_fail: item.is_fail,
        })
        .collect()
}

fn sorted_non_zero_values(map: &HashMap<String, usize>) -> Vec<usize> {
    let mut values: Vec<usize> = map.values().copied().filter(|v| *v > 0).collect();
    values.sort_unstable();
    values
}
