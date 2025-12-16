use rayon::prelude::*;
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

// Constants for DFS processing
const MAX_DEDUP_SIZE: usize = 256_000; // 256K states - fits in L2 cache (~1-2MB)
#[allow(dead_code)]
const MAX_GROUPS: usize = 32;
const MAX_AVAILABLE: usize = 7; // Max tokens per group in state2
const MAX_AVAILABLE_COUNT: usize = 100; // Reasonable upper bound for available_count
#[allow(dead_code)]
const MAX_PRECOMPUTED_REVEAL: usize = 6;

/// Lightweight stack for DFS - store only primitives, not full structs
#[derive(Clone)]
struct DFSState {
    state1: u128,
    state2: u128,
    available_count: usize,
    modifier: i16,
    pending_reveal: usize,
    probability: f64,
}

/// Compute direct index from state combination
/// Uses XOR of state hashes + pending for fast O(1) indexing
#[inline(always)]
fn compute_dedup_index(state1: u128, state2: u128, pending: usize) -> usize {
    // Combine states using XOR and bit mixing
    // Use lower bits of state1 and state2 for better distribution
    let hash = (state1 as u64)
        .wrapping_mul(0x9e3779b97f4a7c15) // Mixing constant
        .wrapping_add((state2 as u64).wrapping_mul(0xbf58476d1ce4e5b9))
        .wrapping_add(pending as u64);
    (hash as usize) % MAX_DEDUP_SIZE
}

/// Worker context for each thread - all state is local
struct WorkerContext {
    dedup_array: Vec<f64>,
    dedup_used: Vec<bool>,
    local_cache: FxHashMap<CacheKey, ChaosOddsCacheItem>,
    multinomial_cache: FxHashMap<u128, u64>,
}

impl WorkerContext {
    fn new() -> Self {
        Self {
            dedup_array: vec![0.0; MAX_DEDUP_SIZE],
            dedup_used: vec![false; MAX_DEDUP_SIZE],
            local_cache: FxHashMap::default(),
            multinomial_cache: FxHashMap::default(),
        }
    }
}

/// Process DFS starting from a root state - all state is local to the context
fn run_dfs(
    root: DFSState,
    ctx: &mut WorkerContext,
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    group_len: usize,
    revealed_frost_count: usize,
    precomputed_multinomial: &FxHashMap<u128, u64>,
    prob_table: &[Vec<[f64; MAX_AVAILABLE + 1]>],
) {
    let mut items_to_process = vec![root];

    while let Some(mut item) = items_to_process.pop() {
        if item.pending_reveal == 0 {
            // Final state: apply multinomial for permutations of the same reveal multiset
            let multinomial_key = pack_reveal_as_multinomial_key(item.state1, group_len);
            let mut final_probability = item.probability;
            if multinomial_key != 0 {
                // Fast path: check precomputed table for small reveal counts (≤ 6)
                let combinations =
                    if let Some(&precomputed) = precomputed_multinomial.get(&multinomial_key) {
                        precomputed
                    } else {
                        // Slow path: use cache for larger reveal counts
                        *ctx.multinomial_cache
                            .entry(multinomial_key)
                            .or_insert_with(|| {
                                // Only unpack and compute multinomial on cache miss
                                let reveal_counts = unpack_reveal(item.state1, group_len);
                                let counts: SmallVec<[usize; 32]> =
                                    reveal_counts.iter().map(|&v| v as usize).collect();
                                multinomial(&counts)
                            })
                    };
                final_probability *= combinations as f64;
            }

            let key = build_cache_key(
                item.state1,
                item.state2,
                item.available_count,
                item.modifier,
                0,
            );
            ctx.local_cache
                .entry(key)
                .and_modify(|e| e.probability += final_probability)
                .or_insert(ChaosOddsCacheItem {
                    modifier: item.modifier,
                    probability: final_probability,
                    available_count: item.available_count,
                    state1: item.state1,
                    state2: item.state2,
                    pending_reveal: 0,
                });
            continue;
        }

        if item.available_count == 0 {
            continue;
        }

        // Check once if item qualifies for fast path (most common case)
        let use_fast_path = item.available_count > 0 && item.available_count <= MAX_AVAILABLE_COUNT;

        if use_fast_path {
            process_item_fast_path(
                &mut item,
                groups,
                group_is_frost,
                prob_table,
                revealed_frost_count,
                group_len,
                &mut ctx.dedup_array,
                &mut ctx.dedup_used,
                &mut items_to_process,
            );
        } else {
            process_item_slow_path(
                &mut item,
                groups,
                group_is_frost,
                revealed_frost_count,
                group_len,
                &mut ctx.dedup_array,
                &mut ctx.dedup_used,
                &mut items_to_process,
            );
        }
    }
}

/// Fast path: no bounds checks, direct table lookup, no branching
#[inline(always)]
fn process_item_fast_path(
    item: &mut DFSState,
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    prob_table: &[Vec<[f64; MAX_AVAILABLE + 1]>],
    revealed_frost_count: usize,
    _group_len: usize,
    dedup_array: &mut [f64],
    dedup_used: &mut [bool],
    items_to_process: &mut Vec<DFSState>,
) {
    let available_mask = get_available_mask(item.state1);

    // Iterate only over available groups using bit iteration - O(popcount) instead of O(group_len)
    let mut mask = available_mask;
    while mask != 0 {
        let group_idx = mask.trailing_zeros() as usize;
        mask &= mask - 1; // Clear the lowest set bit

        // Safe: group_idx is guaranteed to be < 32 (mask is u32) and < groups.len()
        let group = unsafe { groups.get_unchecked(group_idx) };
        let token = &group.token;

        // Use pre-computed flag instead of string comparison
        if token.is_fail || (group_is_frost[group_idx] && revealed_frost_count == 1) {
            continue;
        }

        // Get available count from state2 - pure bit operation, no array access
        let available = get_available_count(item.state2, group_idx) as usize;

        // Fast path: assume available <= MAX_AVAILABLE (checked at entry)
        // No bounds checks needed - direct table lookup!
        let step_probability =
            item.probability * prob_table[group_idx][item.available_count - 1][available];

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
        let expected_modifier = item.modifier + (group.modifier as i16);

        // Fast deduplication: direct array access - O(1) access, fits in L2 cache
        let dedup_idx = compute_dedup_index(item.state1, item.state2, next_pending_reveal);

        if dedup_used[dedup_idx] {
            // State already seen: accumulate probability directly
            dedup_array[dedup_idx] += step_probability;
        } else {
            // New state: mark as used and store probability
            dedup_used[dedup_idx] = true;
            dedup_array[dedup_idx] = step_probability;

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

        // Restore original state (undo/backtrack)
        item.state1 = old_state1; // u128 is Copy
        item.state2 = old_state2; // u128 is Copy
    }
}

/// Slow path: with bounds checks and division fallback
#[inline]
fn process_item_slow_path(
    item: &mut DFSState,
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    revealed_frost_count: usize,
    _group_len: usize,
    dedup_array: &mut [f64],
    dedup_used: &mut [bool],
    items_to_process: &mut Vec<DFSState>,
) {
    let available_mask = get_available_mask(item.state1);

    // Iterate only over available groups using bit iteration
    let mut mask = available_mask;
    while mask != 0 {
        let group_idx = mask.trailing_zeros() as usize;
        mask &= mask - 1; // Clear the lowest set bit

        if group_idx >= groups.len() {
            continue;
        }

        let group = &groups[group_idx];
        let token = &group.token;

        // Use pre-computed flag instead of string comparison
        if token.is_fail || (group_is_frost[group_idx] && revealed_frost_count == 1) {
            continue;
        }

        // Get available count from state2 - pure bit operation, no array access
        let available = get_available_count(item.state2, group_idx) as usize;

        // Slow path: compute probability using multiplication with precomputed reciprocal
        let available_count_reciprocal = 1.0 / (item.available_count as f64);
        let step_probability = item.probability * (available as f64 * available_count_reciprocal);

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
        let expected_modifier = item.modifier + (group.modifier as i16);

        // Fast deduplication: direct array access - O(1) access, fits in L2 cache
        let dedup_idx = compute_dedup_index(item.state1, item.state2, next_pending_reveal);

        if dedup_used[dedup_idx] {
            // State already seen: accumulate probability directly
            dedup_array[dedup_idx] += step_probability;
        } else {
            // New state: mark as used and store probability
            dedup_used[dedup_idx] = true;
            dedup_array[dedup_idx] = step_probability;

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

        // Restore original state (undo/backtrack)
        item.state1 = old_state1; // u128 is Copy
        item.state2 = old_state2; // u128 is Copy
    }
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
    // Precompute reciprocal to avoid division in hot loop
    let total_f64_reciprocal = 1.0 / (total_tokens as f64);

    for (group_idx, group) in groups.iter().enumerate() {
        if group.token.reveal_count > 0 {
            continue;
        }

        let probability = group.count as f64 * total_f64_reciprocal;
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

    // Seed final_cache_map with existing cache entries (deduplicated)
    let mut final_cache_map: FxHashMap<CacheKey, usize> = FxHashMap::default();
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

    // Build cache and index map, merge duplicates
    for (key, item) in temp_items {
        if let Some(&existing_idx) = final_cache_map.get(&key) {
            cache[existing_idx].probability += item.probability;
        } else {
            let idx = cache.len();
            cache.push(item);
            final_cache_map.insert(key, idx);
        }
    }

    // Step 1️⃣: Prepare root DFS states
    let mut roots: Vec<DFSState> = Vec::new();
    let total_count: usize = groups.iter().map(|g| g.count).sum();
    // Precompute reciprocal to avoid division when seeding reveal tokens
    let total_count_reciprocal = 1.0 / (total_count as f64);

    for (group_idx, group) in reveal_groups {
        if group.token.is_fail {
            continue;
        }

        // Build state2: decrement count for current group
        let state2 = dec_available_count(base_state2, group_idx);
        let available_mask = build_available_mask(state2, group_len);
        let state1 = build_state1(available_mask, 0u128);

        let probability = group.count as f64 * total_count_reciprocal;
        let modifier = group.modifier as i16;

        roots.push(DFSState {
            state1,
            state2,
            available_count: total_count.saturating_sub(1),
            modifier,
            pending_reveal: group.token.reveal_count,
            probability,
        });
    }

    if roots.is_empty() {
        return cache;
    }

    // Precompute multinomial table for small reveal counts (≤ 6) to avoid unpack + SmallVec
    // For total reveal count ≤ 6, we can precompute all possible combinations
    const MAX_PRECOMPUTED_REVEAL: usize = 6;
    let mut precomputed_multinomial: FxHashMap<u128, u64> = FxHashMap::default();

    // Precompute all multinomial values for total ≤ MAX_PRECOMPUTED_REVEAL
    // This eliminates unpack + SmallVec + sorting for common small cases
    fn precompute_small_multinomials(
        max_total: usize,
        group_len: usize,
        precomputed: &mut FxHashMap<u128, u64>,
    ) {
        // Generate all possible partitions of n into at most group_len parts
        // Each partition represents a multiset of reveal counts
        fn generate_partitions(
            n: usize,
            max_parts: usize,
            current: &mut [u8],
            len: usize,
            precomputed: &mut FxHashMap<u128, u64>,
        ) {
            if n == 0 {
                // Compute multinomial for this partition
                let mut sorted = current[..len].to_vec();
                sorted.sort_unstable();

                // Pack as u128 key (same format as pack_reveal_as_multinomial_key)
                let mut key = 0u128;
                for (i, &count) in sorted.iter().enumerate().take(32) {
                    key |= (count as u128 & 0xF) << (i * 4);
                }

                // Compute multinomial coefficient
                let total: usize = sorted.iter().map(|&c| c as usize).sum();
                let mut log_result = 0.0;
                for i in 1..=total {
                    log_result += (i as f64).ln();
                }
                for &k in &sorted {
                    if k > 0 {
                        for i in 1..=k as usize {
                            log_result -= (i as f64).ln();
                        }
                    }
                }
                let result = (log_result.exp() + 0.5) as u64;
                precomputed.insert(key, result);
                return;
            }

            if len >= max_parts {
                return;
            }

            let start = if len > 0 {
                current[len - 1] as usize
            } else {
                1
            };
            for k in start..=n.min(15) {
                // Max 15 per count (4 bits)
                current[len] = k as u8;
                generate_partitions(n - k, max_parts, current, len + 1, precomputed);
            }
        }

        let mut current = [0u8; 32];
        for total in 1..=max_total {
            generate_partitions(total, group_len.min(24), &mut current, 0, precomputed);
        }
    }

    precompute_small_multinomials(
        MAX_PRECOMPUTED_REVEAL,
        group_len,
        &mut precomputed_multinomial,
    );

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
            // Precompute reciprocal to avoid division inside inner loop
            let available_count_reciprocal = 1.0 / (available_count as f64);

            // Precompute for all possible available values (0-7)
            for available in 0..=MAX_AVAILABLE.min(available_count) {
                probs[available] = available as f64 * available_count_reciprocal;
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

    // Step 3️⃣: Parallel processing with rayon
    // Each thread processes one root with its own local context
    let partial_results: Vec<FxHashMap<CacheKey, ChaosOddsCacheItem>> = roots
        .par_iter()
        .map(|root| {
            let mut ctx = WorkerContext::new();
            run_dfs(
                root.clone(),
                &mut ctx,
                &groups,
                &group_is_frost,
                group_len,
                revealed_frost_count,
                &precomputed_multinomial,
                &prob_table,
            );
            ctx.local_cache
        })
        .collect();

    // Step 4️⃣: Merge results (single thread)
    let mut final_cache: FxHashMap<CacheKey, ChaosOddsCacheItem> = FxHashMap::default();
    for local in partial_results {
        for (key, item) in local {
            final_cache
                .entry(key)
                .and_modify(|e: &mut ChaosOddsCacheItem| e.probability += item.probability)
                .or_insert(item);
        }
    }

    // Merge parallel results with existing cache
    for (key, item) in final_cache {
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
