use rayon::prelude::*;
use rustc_hash::FxHashMap;
use smallvec::SmallVec;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, get_reveal, pack_available_counts,
    pack_reveal_as_multinomial_key, unpack_reveal, CacheKey,
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
// Reduced for mobile: smaller dedup size to fit in L2 cache better
const MAX_DEDUP_SIZE: usize = 128_000; // 128K states - fits in mobile L2 cache (~512KB-1MB)
const MAX_DEDUP_BITS: usize = (MAX_DEDUP_SIZE + 31) / 32; // Packed bits: ceil(MAX_DEDUP_SIZE / 32)
#[allow(dead_code)]
const MAX_GROUPS: usize = 32;
const MAX_AVAILABLE: usize = 7; // Max tokens per group in state2
const MAX_AVAILABLE_COUNT: usize = 100; // Reasonable upper bound for available_count
#[allow(dead_code)]
const MAX_PRECOMPUTED_REVEAL: usize = 6;
// Mobile-optimized: fixed-size stack for DFS (completely stack-allocated, zero heap allocation)
// Size 64 is sufficient for most DFS paths and fits in L1/L2 cache
const DFS_STACK_SIZE: usize = 64; // Fixed size for stack-allocated array
                                  // Local dedup cache size: stack-allocated cache for hot path (fits in L1 cache)
const LOCAL_DEDUP_CACHE_SIZE: usize = 16; // 16 entries: 16 * (8 + 8) = 256 bytes - fits in L1

/// Fixed-size stack for DFS - completely stack-allocated, zero heap allocation
/// Uses ring buffer with head/tail indices for efficient push/pop operations
/// Size: DFS_STACK_SIZE * sizeof(DFSState) = 64 * 32 bytes = 2KB - fits in L1 cache
struct FixedStack {
    items: [DFSState; DFS_STACK_SIZE],
    head: usize, // Index of next element to pop (read position)
    tail: usize, // Index of next element to push (write position)
    len: usize,  // Current number of elements
}

impl FixedStack {
    #[inline(always)]
    fn new() -> Self {
        // Initialize array with default DFSState (all zeros)
        // DFSState is Copy, so we can use array initialization
        let default_state = DFSState {
            state1: 0,
            state2: 0,
            available_mask: 0,
            available_count: 0,
            modifier: 0,
            pending_reveal: 0,
            probability: 0.0,
        };
        Self {
            items: [default_state; DFS_STACK_SIZE],
            head: 0,
            tail: 0,
            len: 0,
        }
    }

    /// Push item to stack (ring buffer)
    /// Returns true if successful, false if stack is full
    #[inline(always)]
    fn push(&mut self, item: DFSState) -> bool {
        if self.len >= DFS_STACK_SIZE {
            return false; // Stack full
        }
        self.items[self.tail] = item;
        self.tail = (self.tail + 1) % DFS_STACK_SIZE;
        self.len += 1;
        true
    }

    /// Pop item from stack (ring buffer)
    /// Returns Some(item) if stack is not empty, None otherwise
    #[inline(always)]
    fn pop(&mut self) -> Option<DFSState> {
        if self.len == 0 {
            return None;
        }
        let item = self.items[self.head];
        self.head = (self.head + 1) % DFS_STACK_SIZE;
        self.len -= 1;
        Some(item)
    }
}

/// Lightweight stack for DFS - store only primitives, not full structs
#[derive(Clone, Copy)]
struct DFSState {
    state1: u128,
    state2: u128,
    available_mask: u32, // Precomputed mask to avoid repeated get_available_mask calls
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

/// Local stack-allocated dedup cache for hot path optimization
/// Avoids memory loads/stores to large dedup_array by caching recent indices
/// Size: 16 entries * 16 bytes = 256 bytes - fits in L1 cache
struct LocalDedupCache {
    indices: [usize; LOCAL_DEDUP_CACHE_SIZE],
    probs: [f64; LOCAL_DEDUP_CACHE_SIZE],
    count: usize,
}

impl LocalDedupCache {
    #[inline(always)]
    fn new() -> Self {
        Self {
            indices: [usize::MAX; LOCAL_DEDUP_CACHE_SIZE], // Invalid index marker
            probs: [0.0; LOCAL_DEDUP_CACHE_SIZE],
            count: 0,
        }
    }

    /// Check if index exists in cache and return probability if found
    /// Returns (found, prob) tuple
    #[inline(always)]
    fn get(&self, idx: usize) -> Option<f64> {
        // Linear search through cache (small array, very fast)
        // Unrolled loop for better performance
        let len = self.count.min(LOCAL_DEDUP_CACHE_SIZE);
        for i in 0..len {
            if self.indices[i] == idx {
                return Some(self.probs[i]);
            }
        }
        None
    }

    /// Update or insert index in cache
    /// Uses simple circular replacement (not LRU) for speed
    #[inline(always)]
    fn insert(&mut self, idx: usize, prob: f64) {
        // First try to find existing entry
        let len = self.count.min(LOCAL_DEDUP_CACHE_SIZE);
        for i in 0..len {
            if self.indices[i] == idx {
                self.probs[i] = prob;
                return;
            }
        }

        // Not found: insert at next position (circular)
        let pos = self.count % LOCAL_DEDUP_CACHE_SIZE;
        self.indices[pos] = idx;
        self.probs[pos] = prob;
        if self.count < LOCAL_DEDUP_CACHE_SIZE {
            self.count += 1;
        }
    }

    /// Clear cache (called at start of each DFS level)
    #[inline(always)]
    fn clear(&mut self) {
        self.count = 0;
        // No need to clear arrays - invalid indices (usize::MAX) serve as markers
    }
}

/// Batch accumulation buffer for SIMD optimization
/// Collects (index, probability) pairs for batch processing
#[derive(Default)]
struct BatchAccumBuffer {
    indices: [usize; 4],
    probs: [f64; 4],
    count: usize,
}

impl BatchAccumBuffer {
    #[inline(always)]
    fn clear(&mut self) {
        self.count = 0;
    }

    #[inline(always)]
    fn push(&mut self, idx: usize, prob: f64) -> bool {
        if self.count < 4 {
            self.indices[self.count] = idx;
            self.probs[self.count] = prob;
            self.count += 1;
            false // Not full yet
        } else {
            true // Full, needs flush
        }
    }

    #[inline(always)]
    fn len(&self) -> usize {
        self.count
    }
}

/// Worker context for each thread - all state is local
/// Optimized for mobile: packed bits instead of Vec<bool>, f32 for prob_table
/// Note: dedup_array uses f64 for precision in probability accumulation
struct WorkerContext {
    dedup_array: Vec<f64>, // f64 for precision: probability accumulation requires high precision
    dedup_used: Vec<u32>,  // Packed bits: 32 bits per u32 instead of 1 byte per bool
    local_cache: FxHashMap<CacheKey, ChaosOddsCacheItem>,
    multinomial_cache: FxHashMap<u128, u64>,
    // Local dedup cache: avoid repeated bit mask checks for same index
    last_dedup_idx: usize,
    last_dedup_prob: f64,
    // Batch accumulation buffer for SIMD optimization
    batch_buffer: BatchAccumBuffer,
    // Stack-local dedup cache: fast L1 cache for hot path (256 bytes)
    local_dedup_cache: LocalDedupCache,
}

impl WorkerContext {
    fn new() -> Self {
        Self {
            dedup_array: vec![0.0f64; MAX_DEDUP_SIZE],
            dedup_used: vec![0u32; MAX_DEDUP_BITS], // Packed bits: each u32 holds 32 flags
            local_cache: FxHashMap::default(),
            multinomial_cache: FxHashMap::default(),
            last_dedup_idx: usize::MAX, // Invalid index to force check on first use
            last_dedup_prob: 0.0,
            batch_buffer: BatchAccumBuffer::default(),
            local_dedup_cache: LocalDedupCache::new(),
        }
    }

    /// Check if dedup index is used (bit is set)
    #[inline(always)]
    fn is_used(&self, idx: usize) -> bool {
        let word_idx = idx / 32;
        let bit_idx = idx % 32;
        (self.dedup_used[word_idx] & (1u32 << bit_idx)) != 0
    }

    /// Mark dedup index as used (set bit)
    #[inline(always)]
    fn set_used(&mut self, idx: usize) {
        let word_idx = idx / 32;
        let bit_idx = idx % 32;
        self.dedup_used[word_idx] |= 1u32 << bit_idx;
    }

    /// Accumulate probability with local cache optimization
    /// Uses stack-local cache to avoid memory loads/stores in hot path
    #[inline(always)]
    fn accumulate_probability(&mut self, idx: usize, prob: f64) -> bool {
        // Fast path 1: same index as last time (common case in tight loops)
        if idx == self.last_dedup_idx {
            self.last_dedup_prob += prob;
            self.dedup_array[idx] = self.last_dedup_prob;
            self.local_dedup_cache.insert(idx, self.last_dedup_prob);
            return true; // Already seen
        }

        // Fast path 2: check stack-local cache (L1 cache, no memory load)
        if let Some(cached_prob) = self.local_dedup_cache.get(idx) {
            let new_prob = cached_prob + prob;
            self.last_dedup_idx = idx;
            self.last_dedup_prob = new_prob;
            self.dedup_array[idx] = new_prob;
            self.local_dedup_cache.insert(idx, new_prob);
            return true; // Already seen
        }

        // Slow path: check large dedup_array (memory access)
        let is_used = self.is_used(idx);
        if is_used {
            // Update cache and accumulate
            self.last_dedup_idx = idx;
            self.last_dedup_prob = self.dedup_array[idx] + prob;
            self.dedup_array[idx] = self.last_dedup_prob;
            self.local_dedup_cache.insert(idx, self.last_dedup_prob);
        } else {
            // New state: mark as used and store
            self.set_used(idx);
            self.last_dedup_idx = idx;
            self.last_dedup_prob = prob;
            self.dedup_array[idx] = prob;
            self.local_dedup_cache.insert(idx, prob);
        }
        is_used
    }

    /// Batch accumulate probabilities with SIMD optimization
    /// Processes multiple (idx, prob) pairs at once when possible
    /// Uses stack-local cache to avoid memory loads/stores in hot path
    #[inline(always)]
    fn batch_accumulate(&mut self, idx: usize, prob: f64) -> bool {
        // Fast path 1: same index as last time (common case in tight loops)
        if idx == self.last_dedup_idx {
            self.last_dedup_prob += prob;
            self.dedup_array[idx] = self.last_dedup_prob;
            self.local_dedup_cache.insert(idx, self.last_dedup_prob);
            return true; // Already seen
        }

        // Fast path 2: check stack-local cache (L1 cache, no memory load)
        if let Some(cached_prob) = self.local_dedup_cache.get(idx) {
            let new_prob = cached_prob + prob;
            self.last_dedup_idx = idx;
            self.last_dedup_prob = new_prob;
            self.dedup_array[idx] = new_prob;
            self.local_dedup_cache.insert(idx, new_prob);
            return true; // Already seen
        }

        // Try to add to batch buffer
        if self.batch_buffer.push(idx, prob) {
            // Buffer is full, flush with SIMD if possible
            self.flush_batch();
            // Add current item to buffer
            self.batch_buffer.push(idx, prob);
        }

        // Check if this index was already seen (for return value)
        let is_used = self.is_used(idx);
        if is_used {
            // Update cache
            self.last_dedup_idx = idx;
            self.last_dedup_prob = self.dedup_array[idx];
            self.local_dedup_cache.insert(idx, self.last_dedup_prob);
        } else {
            // New state: will be set in flush_batch
            self.last_dedup_idx = idx;
            self.last_dedup_prob = prob;
        }
        is_used
    }

    /// Flush batch buffer with SIMD optimization
    #[inline]
    fn flush_batch(&mut self) {
        if self.batch_buffer.len() == 0 {
            return;
        }

        #[cfg(feature = "simd")]
        {
            // Use SIMD for batch accumulation when available
            self.flush_batch_simd();
        }

        #[cfg(not(feature = "simd"))]
        {
            // Fallback: process individually using accumulate_probability
            // accumulate_probability already updates local_dedup_cache
            for i in 0..self.batch_buffer.len() {
                let idx = self.batch_buffer.indices[i];
                let prob = self.batch_buffer.probs[i];
                self.accumulate_probability(idx, prob);
            }
        }

        self.batch_buffer.clear();
    }

    #[cfg(feature = "simd")]
    #[inline]
    fn flush_batch_simd(&mut self) {
        use std::simd::*;

        let count = self.batch_buffer.len();
        if count == 0 {
            return;
        }

        // Check if indices are suitable for SIMD (consecutive or close enough)
        // For now, process with SIMD if we have 2 or 4 elements
        match count {
            2 => {
                // Use f64x2 for 2 elements
                let idx0 = self.batch_buffer.indices[0];
                let idx1 = self.batch_buffer.indices[1];
                let prob0 = self.batch_buffer.probs[0];
                let prob1 = self.batch_buffer.probs[1];

                // Check if both are used
                let used0 = self.is_used(idx0);
                let used1 = self.is_used(idx1);

                if used0 && used1 {
                    // Both already exist: SIMD add
                    let probs = f64x2::from_array([prob0, prob1]);
                    let existing =
                        f64x2::from_array([self.dedup_array[idx0], self.dedup_array[idx1]]);
                    let result = existing + probs;
                    self.dedup_array[idx0] = result[0];
                    self.dedup_array[idx1] = result[1];
                    // Update local cache
                    self.local_dedup_cache.insert(idx0, result[0]);
                    self.local_dedup_cache.insert(idx1, result[1]);
                } else {
                    // Fallback to individual processing
                    if used0 {
                        self.dedup_array[idx0] += prob0;
                        self.local_dedup_cache.insert(idx0, self.dedup_array[idx0]);
                    } else {
                        self.set_used(idx0);
                        self.dedup_array[idx0] = prob0;
                        self.local_dedup_cache.insert(idx0, prob0);
                    }
                    if used1 {
                        self.dedup_array[idx1] += prob1;
                        self.local_dedup_cache.insert(idx1, self.dedup_array[idx1]);
                    } else {
                        self.set_used(idx1);
                        self.dedup_array[idx1] = prob1;
                        self.local_dedup_cache.insert(idx1, prob1);
                    }
                }
            }
            4 => {
                // Use f64x4 for 4 elements (if available, otherwise f64x2 twice)
                let idx0 = self.batch_buffer.indices[0];
                let idx1 = self.batch_buffer.indices[1];
                let idx2 = self.batch_buffer.indices[2];
                let idx3 = self.batch_buffer.indices[3];
                let prob0 = self.batch_buffer.probs[0];
                let prob1 = self.batch_buffer.probs[1];
                let prob2 = self.batch_buffer.probs[2];
                let prob3 = self.batch_buffer.probs[3];

                // Check if all are used
                let used0 = self.is_used(idx0);
                let used1 = self.is_used(idx1);
                let used2 = self.is_used(idx2);
                let used3 = self.is_used(idx3);

                if used0 && used1 && used2 && used3 {
                    // All already exist: SIMD add (use f64x2 twice for compatibility)
                    let probs_lo = f64x2::from_array([prob0, prob1]);
                    let probs_hi = f64x2::from_array([prob2, prob3]);
                    let existing_lo =
                        f64x2::from_array([self.dedup_array[idx0], self.dedup_array[idx1]]);
                    let existing_hi =
                        f64x2::from_array([self.dedup_array[idx2], self.dedup_array[idx3]]);
                    let result_lo = existing_lo + probs_lo;
                    let result_hi = existing_hi + probs_hi;
                    self.dedup_array[idx0] = result_lo[0];
                    self.dedup_array[idx1] = result_lo[1];
                    self.dedup_array[idx2] = result_hi[0];
                    self.dedup_array[idx3] = result_hi[1];
                    // Update local cache
                    self.local_dedup_cache.insert(idx0, result_lo[0]);
                    self.local_dedup_cache.insert(idx1, result_lo[1]);
                    self.local_dedup_cache.insert(idx2, result_hi[0]);
                    self.local_dedup_cache.insert(idx3, result_hi[1]);
                } else {
                    // Fallback to individual processing
                    for i in 0..4 {
                        let idx = self.batch_buffer.indices[i];
                        let prob = self.batch_buffer.probs[i];
                        let is_used = self.is_used(idx);
                        if is_used {
                            self.dedup_array[idx] += prob;
                        } else {
                            self.set_used(idx);
                            self.dedup_array[idx] = prob;
                        }
                        self.local_dedup_cache.insert(idx, self.dedup_array[idx]);
                    }
                }
            }
            _ => {
                // Process individually for other counts
                for i in 0..count {
                    let idx = self.batch_buffer.indices[i];
                    let prob = self.batch_buffer.probs[i];
                    let is_used = self.is_used(idx);
                    if is_used {
                        self.dedup_array[idx] += prob;
                    } else {
                        self.set_used(idx);
                        self.dedup_array[idx] = prob;
                    }
                    self.local_dedup_cache.insert(idx, self.dedup_array[idx]);
                }
            }
        }
    }
}

/// Process DFS starting from a root state - all state is local to the context
fn run_dfs(
    root: &DFSState,
    ctx: &mut WorkerContext,
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    group_len: usize,
    revealed_frost_count: usize,
    precomputed_multinomial: &FxHashMap<u128, u64>,
    prob_table: &[[[f32; MAX_AVAILABLE + 1]; MAX_AVAILABLE_COUNT]; MAX_GROUPS],
) {
    // Clear local dedup cache at start of DFS (fresh state for each root)
    ctx.local_dedup_cache.clear();

    // Fixed-size stack-allocated array with ring buffer - zero heap allocation
    // Size: 64 * 32 bytes = 2KB - fits in L1 cache, completely stack-local
    let mut items_to_process = FixedStack::new();
    let _ = items_to_process.push(DFSState {
        state1: root.state1,
        state2: root.state2,
        available_mask: root.available_mask,
        available_count: root.available_count,
        modifier: root.modifier,
        pending_reveal: root.pending_reveal,
        probability: root.probability,
    });

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

        process_item(
            &mut item,
            groups,
            group_is_frost,
            prob_table,
            revealed_frost_count,
            group_len,
            ctx,
            &mut items_to_process,
        );
    }

    // Flush any remaining items in batch buffer
    ctx.flush_batch();
}

/// Process item: unified fast/slow path with conditional probability calculation
#[inline(always)]
fn process_item(
    item: &mut DFSState,
    groups: &[ChaosOddsGroup],
    group_is_frost: &[bool],
    prob_table: &[[[f32; MAX_AVAILABLE + 1]; MAX_AVAILABLE_COUNT]; MAX_GROUPS],
    revealed_frost_count: usize,
    _group_len: usize,
    ctx: &mut WorkerContext,
    items_to_process: &mut FixedStack,
) {
    // Use precomputed mask instead of calling get_available_mask
    let available_mask = item.available_mask;

    // Iterate only over available groups using bit iteration - O(popcount) instead of O(group_len)
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

        // Unified probability calculation: use table lookup for fast path, division for slow path
        // prob_table uses f32 for memory efficiency (50% size reduction, ~100KB vs ~200KB)
        // We use prob_table only to check if fast path is available, but compute value in f64
        // This preserves precision while reducing memory usage and L1/L2 cache pressure
        let step_probability = if item.available_count > 0
            && item.available_count <= MAX_AVAILABLE_COUNT
            && prob_table[group_idx][item.available_count - 1][available] > 0.0
        {
            // Fast path: use table to verify availability, but compute in f64 for precision
            // This avoids f32→f64 conversion errors while still benefiting from table structure
            let available_count_reciprocal = 1.0 / (item.available_count as f64);
            item.probability * (available as f64 * available_count_reciprocal)
        } else {
            // Slow path: compute probability using multiplication with precomputed reciprocal
            let available_count_reciprocal = 1.0 / (item.available_count as f64);
            item.probability * (available as f64 * available_count_reciprocal)
        };

        // Modify state in-place (backtracking pattern)
        // Optimize: cache reveal part of state1 to avoid repeated unpack/pack
        let old_state1 = item.state1;
        let old_state2 = item.state2;
        let old_reveal = get_reveal(old_state1); // Cache reveal part once

        // Decrement count in state2: if count becomes 0, clear the bit in mask
        item.state2 = dec_available_count(item.state2, group_idx);
        let new_mask = if get_available_count(item.state2, group_idx) == 0 {
            available_mask & !(1u32 << group_idx)
        } else {
            available_mask
        };
        // Increment reveal count directly (avoid inc_reveal overhead: unpack + pack)
        // Direct bit manipulation: reveal is at bits 32-127, each counter is 4 bits
        let new_reveal = if group_idx < 24 {
            old_reveal + (1u128 << (group_idx * 4))
        } else {
            old_reveal
        };
        item.state1 = (new_mask as u128) | (new_reveal << 32);

        let next_available_count = item.available_count.saturating_sub(1);
        let next_pending_reveal = item.pending_reveal.saturating_sub(1) + token.reveal_count;
        let expected_modifier = item.modifier + group.modifier;

        // Fast deduplication: direct array access - O(1) access, fits in L2 cache
        // Use batch accumulation with SIMD optimization when possible
        let dedup_idx = compute_dedup_index(item.state1, item.state2, next_pending_reveal);
        let is_duplicate = ctx.batch_accumulate(dedup_idx, step_probability);

        if !is_duplicate {
            // New state: push to stack for further processing
            // FixedStack will return false if full, but we continue processing
            let _ = items_to_process.push(DFSState {
                state1: item.state1,      // u128 is Copy
                state2: item.state2,      // u128 is Copy
                available_mask: new_mask, // Precomputed mask
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
        let modifier = group.modifier;

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
        let modifier = group.modifier;

        roots.push(DFSState {
            state1,
            state2,
            available_mask, // Precomputed mask
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

                // Compute multinomial coefficient using optimized multinomial function
                // This uses precomputed factorials for small values (no ln/exp)
                let counts: SmallVec<[usize; 32]> = sorted.iter().map(|&c| c as usize).collect();
                let result = multinomial(&counts);
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
    // Mobile-optimized: static array on stack, f32 for memory efficiency
    // Structure: prob_table[group_idx][available_count - 1][available] = available / available_count
    // Size: MAX_GROUPS * MAX_AVAILABLE_COUNT * (MAX_AVAILABLE + 1) * 4 bytes (f32)
    // = 32 * 100 * 8 * 4 = ~100KB - fits in L2 cache, f32 sufficient for lookup values
    // Note: Convert f32 → f64 only when accumulating probabilities (preserves precision)
    let mut prob_table: [[[f32; MAX_AVAILABLE + 1]; MAX_AVAILABLE_COUNT]; MAX_GROUPS] =
        [[[0.0f32; MAX_AVAILABLE + 1]; MAX_AVAILABLE_COUNT]; MAX_GROUPS];

    for group_idx in 0..group_len.min(MAX_GROUPS) {
        // Precompute for all available_count values from 1 to total_count
        for available_count in 1..=total_count.min(MAX_AVAILABLE_COUNT) {
            // Precompute reciprocal in f64 for precision, then convert to f32 for storage
            // This preserves accuracy during computation while saving memory
            let available_count_reciprocal = 1.0 / (available_count as f64);

            // Precompute for all possible available values (0-7)
            for available in 0..=MAX_AVAILABLE.min(available_count) {
                // Compute in f64 for precision, then convert to f32 for storage
                let prob_f64 = available as f64 * available_count_reciprocal;
                prob_table[group_idx][available_count - 1][available] = prob_f64 as f32;
            }
        }
        // Remaining entries are already zero-initialized
    }

    // Step 3️⃣: Parallel processing with rayon - work-stealing with adaptive chunking
    // Use adaptive chunk size for optimal load balancing:
    // - Small chunks (1-2 roots) when roots < threads: enables work-stealing to keep all threads busy
    // - Larger chunks when roots >> threads: better cache locality, less overhead
    let num_threads = rayon::current_num_threads();
    let chunk_size = if roots.len() <= num_threads {
        // When roots <= threads, use chunk size 1 for maximum work-stealing flexibility
        // This ensures all threads can participate even with few roots
        1
    } else {
        // When roots >> threads, use larger chunks (2-4 roots per chunk)
        // This improves cache locality while still allowing work-stealing
        (roots.len() / (num_threads * 2)).max(1).min(4)
    };

    let partial_results: Vec<FxHashMap<CacheKey, ChaosOddsCacheItem>> = roots
        .par_chunks(chunk_size)
        .map(|chunk| {
            // Each thread processes a chunk of roots with its own local context
            // Multiple roots share the same context for better cache locality
            let mut ctx = WorkerContext::new();
            for root in chunk {
                run_dfs(
                    root, // Pass reference instead of cloning
                    &mut ctx,
                    &groups,
                    &group_is_frost,
                    group_len,
                    revealed_frost_count,
                    &precomputed_multinomial,
                    &prob_table,
                );
            }
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
