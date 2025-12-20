// DEBUG VERSION - для сравнения с рабочим DFS
// Копируем текущий DP алгоритм с отладочными логами

use rustc_hash::FxHashMap;
use std::fs::OpenOptions;
use std::io::Write;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, get_reveal, inc_reveal,
    pack_available_counts, set_available_count,
};
use crate::util::groups::{build_groups, groups_to_available_map};

/// Minimal DP state - ARM optimized
#[derive(Clone, Copy, Hash, PartialEq, Eq)]
struct DPState {
    counts: [u8; 20],
    pending: u8,
    modifier: i16,
}

impl DPState {
    #[inline(always)]
    fn new(counts: [u8; 20], pending: u8, modifier: i16) -> Self {
        Self {
            counts,
            pending,
            modifier,
        }
    }

    #[inline(always)]
    fn total(&self, group_len: usize) -> u8 {
        self.counts[..group_len.min(20)].iter().sum()
    }
}

fn log_debug(message: &str, data: serde_json::Value) {
    let log_entry = serde_json::json!({
        "timestamp": std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_millis(),
        "location": "get_chaos_bag_modifiers_debug.rs",
        "message": message,
        "data": data,
        "sessionId": "debug-session",
        "runId": "dp-debug",
    });

    if let Ok(mut file) = OpenOptions::new()
        .create(true)
        .append(true)
        .open("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log")
    {
        let _ = writeln!(file, "{}", log_entry);
    }
}

/// Simple DP processing - one algorithm, maximum simplicity
fn process_reveal_tokens_dp_debug(
    roots: &[(u128, u128, i16, usize, f64)],
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    group_len: usize,
    revealed_frost_count: usize,
    cache: &mut FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem>,
    test_name: &str,
) {
    if roots.is_empty() || group_len == 0 {
        return;
    }

    let effective_group_len = group_len.min(20);

    log_debug(
        "DP_START",
        serde_json::json!({
            "test_name": test_name,
            "roots_count": roots.len(),
            "group_len": group_len,
        }),
    );

    // Convert roots to DP states
    let mut current_level: FxHashMap<DPState, (f64, u128)> = FxHashMap::default();
    for (idx, (state1, state2, modifier, pending, prob)) in roots.iter().enumerate() {
        let mut counts = [0u8; 20];
        for i in 0..effective_group_len {
            counts[i] = get_available_count(*state2, i);
        }
        let state = DPState::new(counts, (*pending).min(255) as u8, *modifier);
        let reveal = get_reveal(*state1);

        log_debug(
            "ROOT_STATE",
            serde_json::json!({
                "idx": idx,
                "modifier": *modifier,
                "pending": *pending,
                "probability": *prob,
                "counts": counts[..effective_group_len].to_vec(),
            }),
        );

        current_level
            .entry(state)
            .and_modify(|(p, _r)| *p += *prob)
            .or_insert((*prob, reveal));
    }

    // DP by pending_reveal levels
    let mut next_level: FxHashMap<DPState, (f64, u128)> = FxHashMap::default();
    let mut level_num = 0;

    while !current_level.is_empty() {
        next_level.clear();
        level_num += 1;

        log_debug(
            "DP_LEVEL_START",
            serde_json::json!({
                "level": level_num,
                "states_count": current_level.len(),
            }),
        );

        for (state, (prob, reveal)) in current_level.drain() {
            log_debug(
                "PROCESS_STATE",
                serde_json::json!({
                    "level": level_num,
                    "modifier": state.modifier,
                    "pending": state.pending,
                    "probability": prob,
                    "total_tokens": state.total(effective_group_len),
                }),
            );

            // CRITICAL: Hard stop when pending == 0
            if state.pending == 0 {
                let total = state.total(effective_group_len) as usize;

                log_debug(
                    "FINALIZE_STATE",
                    serde_json::json!({
                        "modifier": state.modifier,
                        "probability": prob,
                        "total": total,
                    }),
                );

                // Rebuild state2 from counts
                let mut state2 = 0u128;
                for i in 0..effective_group_len {
                    let count = state.counts[i].min(7);
                    state2 = set_available_count(state2, i, count);
                }

                // Rebuild state1
                let available_mask = {
                    let mut mask = 0u32;
                    for i in 0..effective_group_len {
                        if state.counts[i] > 0 {
                            mask |= 1u32 << i;
                        }
                    }
                    mask
                };
                let state1 = (available_mask as u128) | (reveal << 32);

                let key = build_cache_key(state1, state2, total, state.modifier, 0);

                if let Some(existing) = cache.get_mut(&key) {
                    existing.probability += prob;
                    log_debug(
                        "CACHE_UPDATE",
                        serde_json::json!({
                            "modifier": state.modifier,
                            "added_prob": prob,
                            "total_prob": existing.probability,
                        }),
                    );
                } else {
                    cache.insert(
                        key,
                        ChaosOddsCacheItem {
                            modifier: state.modifier,
                            probability: prob,
                            available_count: total,
                            state1,
                            state2,
                            pending_reveal: 0,
                        },
                    );
                    log_debug(
                        "CACHE_INSERT",
                        serde_json::json!({
                            "modifier": state.modifier,
                            "probability": prob,
                        }),
                    );
                }
                continue;
            }

            let total_left = state.total(effective_group_len);
            if total_left == 0 {
                log_debug(
                    "SKIP_EMPTY",
                    serde_json::json!({
                        "modifier": state.modifier,
                        "pending": state.pending,
                    }),
                );
                continue;
            }

            let total_f = total_left as f64;

            // Process all possible draws
            for i in 0..effective_group_len {
                let count = state.counts[i];
                if count == 0 {
                    continue;
                }

                let group = &groups[i];

                if group.token.is_fail {
                    continue;
                }

                if group_is_frost[i] && revealed_frost_count == 1 {
                    continue;
                }

                // Create next state
                let mut next_state = state;
                next_state.counts[i] -= 1;
                let old_pending = next_state.pending;
                next_state.pending = next_state
                    .pending
                    .saturating_sub(1)
                    .saturating_add(group.token.reveal_count.min(255) as u8);
                next_state.modifier += group.modifier;

                log_debug(
                    "DRAW_TRANSITION",
                    serde_json::json!({
                        "from_modifier": state.modifier,
                        "from_pending": old_pending,
                        "to_modifier": next_state.modifier,
                        "to_pending": next_state.pending,
                        "group_idx": i,
                        "group_modifier": group.modifier,
                        "group_reveal_count": group.token.reveal_count,
                        "draw_prob": prob * (count as f64 / total_f),
                    }),
                );

                // Update reveal
                let current_mask = {
                    let mut mask = 0u32;
                    for j in 0..effective_group_len {
                        if state.counts[j] > 0 {
                            mask |= 1u32 << j;
                        }
                    }
                    mask
                };
                let temp_state1 = (current_mask as u128) | (reveal << 32);
                let updated_state1 = inc_reveal(temp_state1, i);
                let new_reveal = get_reveal(updated_state1);

                let draw_prob = prob * (count as f64 / total_f);

                next_level
                    .entry(next_state)
                    .and_modify(|(p, _r)| *p += draw_prob)
                    .or_insert((draw_prob, new_reveal));
            }
        }

        std::mem::swap(&mut current_level, &mut next_level);

        if current_level.len() > 100_000 {
            log_debug(
                "SAFETY_LIMIT",
                serde_json::json!({
                    "level": level_num,
                    "states_count": current_level.len(),
                }),
            );
            break;
        }
    }

    log_debug(
        "DP_END",
        serde_json::json!({
            "test_name": test_name,
            "final_level": level_num,
            "cache_size": cache.len(),
        }),
    );
}

/// Debug entry point
pub fn get_chaos_bag_modifiers_debug(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
    test_name: &str,
) -> Vec<ChaosOddsCacheItem> {
    // Simplified version - just call DP with roots
    // Similar structure to main function but with logging
    if tokens.is_empty() {
        return Vec::new();
    }

    let groups = build_groups(tokens);
    let total_tokens = tokens.len();
    if total_tokens == 0 {
        return Vec::new();
    }

    let group_len = groups.len();
    let base_available = groups_to_available_map(&groups);
    let base_available_counts_array = {
        let mut arr = [0u8; 32];
        for (i, &count) in base_available.iter().enumerate().take(32) {
            arr[i] = count.min(7);
        }
        arr
    };
    let base_state2 = pack_available_counts(&base_available_counts_array);
    let group_is_frost: Vec<bool> = groups
        .iter()
        .map(|g| g.token.token_type == "frost")
        .collect();

    // Regular tokens
    let mut cache: Vec<ChaosOddsCacheItem> = Vec::new();
    let total_f64_reciprocal = 1.0 / (total_tokens as f64);

    for (group_idx, group) in groups.iter().enumerate() {
        if group.token.reveal_count > 0 {
            continue;
        }

        let probability = group.count as f64 * total_f64_reciprocal;
        let modifier = group.modifier;
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

        cache.push(ChaosOddsCacheItem {
            modifier,
            probability,
            available_count: total_tokens.saturating_sub(1),
            state1,
            state2,
            pending_reveal: 0,
        });
    }

    // Reveal tokens
    let reveal_groups: Vec<(usize, &ChaosOddsGroup)> = groups
        .iter()
        .enumerate()
        .filter(|(_, g)| g.token.reveal_count > 0)
        .collect();

    if reveal_groups.is_empty() {
        return cache;
    }

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

    // Prepare root states
    let mut roots: Vec<(u128, u128, i16, usize, f64)> = Vec::new();
    let total_count: usize = groups.iter().map(|g| g.count).sum();
    let total_count_reciprocal = 1.0 / (total_count as f64);

    for (group_idx, group) in reveal_groups {
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

        roots.push((
            state1,
            state2,
            modifier,
            group.token.reveal_count,
            probability,
        ));
    }

    if roots.is_empty() {
        return cache;
    }

    // Process with debug DP
    let cache_items: Vec<ChaosOddsCacheItem> = cache.iter().cloned().collect();
    let mut dp_cache: FxHashMap<crate::util::cache::CacheKey, ChaosOddsCacheItem> = {
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

    process_reveal_tokens_dp_debug(
        &roots,
        &groups,
        &group_is_frost,
        group_len,
        revealed_frost_count,
        &mut dp_cache,
        test_name,
    );

    // Merge results
    for (key, item) in dp_cache {
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
