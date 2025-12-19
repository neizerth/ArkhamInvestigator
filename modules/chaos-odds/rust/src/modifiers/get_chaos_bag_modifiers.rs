use rayon::prelude::*;
use rustc_hash::{FxHashMap, FxHashSet};
use smallvec::SmallVec;
use std::sync::OnceLock;
use std::time::Instant;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::cache::{
    build_cache_key, dec_available_count, get_available_count, get_reveal, pack_available_counts,
    pack_reveal_as_multinomial_key, unpack_reveal, CacheKey,
};
use crate::util::groups::{build_groups, groups_to_available_map};
use crate::util::math::multinomial;

/// Global precomputed multinomial cache - initialized once on first use
/// Precomputes all multinomial values for total reveal count ≤ MAX_PRECOMPUTED_REVEAL
/// This is expensive to compute (can take 10-30 seconds), so we do it once and cache it
static PRECOMPUTED_MULTINOMIAL: OnceLock<FxHashMap<u128, u64>> = OnceLock::new();

/// Get or initialize the precomputed multinomial cache
/// This function is called once on first use and caches the result globally
/// iOS OPTIMIZATION: This expensive initialization (10-30s) should be done in background
/// before the first user call to avoid blocking the main thread
pub(crate) fn get_precomputed_multinomial() -> &'static FxHashMap<u128, u64> {
    // Check if already initialized first (fast path)
    if let Some(cache) = PRECOMPUTED_MULTINOMIAL.get() {
        eprintln!("[get_precomputed_multinomial] Cache already initialized, returning (size={})", cache.len());
        return cache;
    }
    
    // Slow path: initialize (this will block other threads until complete)
    eprintln!("[get_precomputed_multinomial] Cache not initialized, starting initialization (this may block other threads)...");
    PRECOMPUTED_MULTINOMIAL.get_or_init(|| {
        eprintln!("[get_precomputed_multinomial] INITIALIZING - this may take 10-30 seconds on first call");
        let init_start = Instant::now();
        let mut precomputed: FxHashMap<u128, u64> = FxHashMap::default();
        
        // Precompute for maximum possible group_len (32) to cover all cases
        const MAX_GROUP_LEN: usize = 32;
        // Increased from 6 to 10 to precompute more multinomial values and reduce runtime computation
        const MAX_PRECOMPUTED_REVEAL: usize = 10;
        
        precompute_small_multinomials(MAX_PRECOMPUTED_REVEAL, MAX_GROUP_LEN, &mut precomputed);
        
        let init_duration = init_start.elapsed();
        eprintln!(
            "[get_precomputed_multinomial] INITIALIZATION COMPLETE: {:?}, entries={}",
            init_duration,
            precomputed.len()
        );
        
        precomputed
    })
}

/// Pre-initialize the precomputed multinomial cache in background
/// Call this function early (e.g., at app startup) to avoid expensive initialization
/// on the first user call. This is critical for iOS performance.
/// 
/// Returns true if initialization was needed (first call), false if already initialized
#[allow(dead_code)] // This function is meant to be called from external code (JSI bindings)
pub fn prewarm_multinomial_cache() -> bool {
    let was_already_initialized = PRECOMPUTED_MULTINOMIAL.get().is_some();
    if was_already_initialized {
        eprintln!("[prewarm_multinomial_cache] Cache already initialized, skipping");
        return false;
    }
    
    eprintln!("[prewarm_multinomial_cache] Cache not initialized, calling get_precomputed_multinomial...");
    let prewarm_start = Instant::now();
    let precomputed_multinomial = get_precomputed_multinomial();
    let prewarm_duration = prewarm_start.elapsed();
    eprintln!("[prewarm_multinomial_cache] Cache initialized in {:?}, size={}", prewarm_duration, precomputed_multinomial.len());
    
    true
}

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

/// Precompute all multinomial values for total ≤ max_total
/// This eliminates unpack + SmallVec + sorting for common small cases
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

// Constants for DFS processing
#[allow(dead_code)]
const MAX_GROUPS: usize = 32;
const MAX_AVAILABLE: usize = 7; // Max tokens per group in state2
const MAX_AVAILABLE_COUNT: usize = 100; // Reasonable upper bound for available_count
#[allow(dead_code)]
const MAX_PRECOMPUTED_REVEAL: usize = 6;
// Mobile-optimized: fixed-size stack for DFS (completely stack-allocated, zero heap allocation)
// Increased from 64 to 256 to handle more complex DFS paths without overflow
// Size: 256 * 32 bytes = 8KB - still fits in L1/L2 cache
const DFS_STACK_SIZE: usize = 256; // Fixed size for stack-allocated array

// Performance limits to prevent exponential explosion
const MAX_DFS_STATES: usize = 100_000; // Maximum states to process in a single DFS run
const MAX_DFS_DEPTH: usize = 50; // Maximum depth to prevent infinite recursion

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

/// Compact deduplication key: u128 hash of (state1, state2, pending_reveal)
/// Using compact u128 key instead of struct reduces hash collisions and improves HashMap performance
/// This is critical for stable performance - struct keys can cause unpredictable hash clustering
#[derive(Clone, Copy, PartialEq, Eq, Hash)]
struct DedupKey(u128);

impl DedupKey {
    /// Create compact key from state components
    /// Uses FxHasher-style mixing to create well-distributed u128 key
    #[inline(always)]
    fn new(state1: u128, state2: u128, pending_reveal: usize) -> Self {
        // Combine state1, state2, and pending_reveal into compact u128 key
        // Use bit mixing to avoid clustering (similar to FxHasher)
        let pending = pending_reveal as u128;
        // Mix bits: rotate and XOR to distribute entropy
        let mixed = state1
            .wrapping_mul(0x9e3779b97f4a7c15u128)
            .wrapping_add(state2)
            .wrapping_mul(0x9e3779b97f4a7c15u128)
            .wrapping_add(pending);
        Self(mixed)
    }
}

// REMOVED: BatchAccumBuffer - replaced with direct HashSet lookup for better performance
// The batch buffer added overhead without significant benefit for our use case

/// Worker context for each thread - all state is local
/// Optimized for mobile: packed bits instead of Vec<bool>, f32 for prob_table
/// Performance optimization: separate HashSet for uniqueness check and HashMap for probability accumulation
struct WorkerContext {
    // OPTIMIZATION: Use HashSet for fast uniqueness check (no value storage overhead)
    dedup_set: FxHashSet<DedupKey>, // Fast O(1) lookup for duplicate detection
    // Only store probabilities for states that need accumulation (new states)
    prob_accumulator: FxHashMap<DedupKey, f64>, // Only for states that need probability accumulation
    local_cache: FxHashMap<CacheKey, ChaosOddsCacheItem>,
    multinomial_cache: FxHashMap<u128, u64>,
    // Local dedup cache: avoid repeated HashMap lookups for same key
    last_dedup_key: Option<DedupKey>,
    // Performance tracking
    states_processed: usize, // Track number of states to prevent explosion
}

impl WorkerContext {
    fn new() -> Self {
        // iOS OPTIMIZATION: Pre-allocate HashMap/HashSet with expected capacity
        // This reduces rehashing and memory allocations in hot loops
        // MAX_DFS_STATES is our limit, so we can pre-allocate for that
        let expected_capacity = (MAX_DFS_STATES / 4).max(1024); // Conservative estimate
        
        Self {
            dedup_set: FxHashSet::with_capacity_and_hasher(expected_capacity, Default::default()),
            prob_accumulator: FxHashMap::with_capacity_and_hasher(expected_capacity, Default::default()),
            local_cache: FxHashMap::with_capacity_and_hasher(expected_capacity, Default::default()),
            multinomial_cache: FxHashMap::with_capacity_and_hasher(256, Default::default()), // Smaller cache
            last_dedup_key: None,
            states_processed: 0,
        }
    }

    /// Check if state is duplicate and accumulate probability if needed
    /// OPTIMIZATION: Use Entry API to reduce hash lookups from 2 to 1
    /// This is critical for iOS performance where memory access is expensive
    #[inline(always)]
    fn check_and_accumulate(&mut self, key: DedupKey, prob: f64) -> bool {
        // Fast path 1: same key as last time (common case in tight loops)
        if let Some(last_key) = self.last_dedup_key {
            if key == last_key {
                // Same key - accumulate probability (guaranteed to exist in accumulator)
                *self.prob_accumulator.get_mut(&key).unwrap() += prob;
                return true; // Already seen
            }
        }

        // OPTIMIZATION: Use Entry API - single hash lookup instead of contains + get_mut
        // This reduces memory accesses from 2 to 1, critical for iOS performance
        match self.prob_accumulator.entry(key) {
            std::collections::hash_map::Entry::Occupied(mut entry) => {
                // State already seen - accumulate probability
                *entry.get_mut() += prob;
                self.last_dedup_key = Some(key);
                true // Already seen
            }
            std::collections::hash_map::Entry::Vacant(entry) => {
                // New state: add to set and track probability
                self.dedup_set.insert(key);
                entry.insert(prob);
                self.last_dedup_key = Some(key);
                false // Not seen before
            }
        }
    }

    /// Increment state counter and check limits
    #[inline(always)]
    fn increment_state_count(&mut self) -> bool {
        self.states_processed += 1;
        self.states_processed < MAX_DFS_STATES
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
    // Clear dedup structures at start of DFS (fresh state for each root)
    ctx.dedup_set.clear();
    ctx.prob_accumulator.clear();

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

    let mut _items_processed = 0;
    let mut _final_states = 0;
    let mut current_depth = 0;
    
    while let Some(mut item) = items_to_process.pop() {
        _items_processed += 1;
        
        // Performance limit: prevent exponential explosion
        if !ctx.increment_state_count() {
            // Removed eprintln! from hot loop - causes IO blocking in multi-threaded mode
            break;
        }
        
        // Depth limit to prevent infinite recursion
        if current_depth > MAX_DFS_DEPTH {
            // Removed eprintln! from hot loop - causes IO blocking in multi-threaded mode
            continue;
        }
        if item.pending_reveal == 0 {
            _final_states += 1;
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
        
        // Decrement depth when processing item (approximate depth tracking)
        current_depth = current_depth.saturating_sub(1);
    }

    // Removed eprintln! from hot loop - causes IO blocking in multi-threaded mode
    // Performance logging moved to outer function level
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

        // Fast deduplication: use compact u128 key for better HashMap performance
        let dedup_key = DedupKey::new(item.state1, item.state2, next_pending_reveal);
        let is_duplicate = ctx.check_and_accumulate(dedup_key, step_probability);

        if !is_duplicate {
            // New state: push to stack for further processing
            // FixedStack will return false if full, but we continue processing
            if !items_to_process.push(DFSState {
                state1: item.state1,      // u128 is Copy
                state2: item.state2,      // u128 is Copy
                available_mask: new_mask, // Precomputed mask
                available_count: next_available_count,
                modifier: expected_modifier,
                pending_reveal: next_pending_reveal,
                probability: step_probability,
            }) {
                // Stack full - skip state (removed eprintln! from hot loop)
            }
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
    let start = Instant::now();
    eprintln!(
        "[get_chaos_bag_modifiers] START: tokens.len()={}, revealed_frost_count={}",
        tokens.len(),
        revealed_frost_count
    );
    
    // Get precomputed multinomial cache early to avoid blocking later
    let cache_access_start = Instant::now();
    let precomputed_multinomial = get_precomputed_multinomial();
    let cache_access_duration = cache_access_start.elapsed();
    eprintln!(
        "[get_chaos_bag_modifiers] Cache access took {:?}, cache_size={}",
        cache_access_duration,
        precomputed_multinomial.len()
    );

    if tokens.is_empty() {
        eprintln!(
            "[get_chaos_bag_modifiers] EARLY RETURN: tokens is empty (took {:?})",
            start.elapsed()
        );
        return Vec::new();
    }

    let t0 = Instant::now();
    let groups = build_groups(tokens);
    eprintln!(
        "[get_chaos_bag_modifiers] build_groups: {:?}, groups.len()={}",
        t0.elapsed(),
        groups.len()
    );

    let total_tokens = tokens.len();
    if total_tokens == 0 {
        eprintln!(
            "[get_chaos_bag_modifiers] EARLY RETURN: total_tokens == 0 (took {:?})",
            start.elapsed()
        );
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

    let mut _regular_count = 0;
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
        _regular_count += 1;
    }
    // Removed verbose logging - only log at function entry/exit for performance

    // ---------- Reveal tokens (reveal_count > 0) ----------
    let reveal_groups: Vec<(usize, &ChaosOddsGroup)> = groups
        .iter()
        .enumerate()
        .filter(|(_, g)| g.token.reveal_count > 0)
        .collect();
    // Removed verbose logging - only log at function entry/exit for performance

    if reveal_groups.is_empty() {
        eprintln!(
            "[get_chaos_bag_modifiers] EARLY RETURN: no reveal groups (took {:?})",
            start.elapsed()
        );
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
    // Removed verbose logging - only log at function entry/exit for performance

    if roots.is_empty() {
        eprintln!(
            "[get_chaos_bag_modifiers] EARLY RETURN: roots is empty (took {:?})",
            start.elapsed()
        );
        return cache;
    }

    // Precomputed multinomial cache was already obtained at the start of the function
    // No need to call get_precomputed_multinomial() again here

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
    // Removed verbose logging - only log at function entry/exit for performance

    // Step 3️⃣: Parallel processing with rayon - iOS-optimized thread limiting
    // iOS performance: limit threads to 2-4 to avoid scheduler overhead and memory contention
    // For small workloads, use single-threaded mode to avoid thread creation overhead
    
    // iOS optimization: limit parallelism for mobile devices
    // Rule: if roots < 2 * optimal_threads, use single-threaded or minimal parallelism
    #[cfg(feature = "mobile")]
    const OPTIMAL_MOBILE_THREADS: usize = 2; // iOS: typically 2-4 big cores
    #[cfg(not(feature = "mobile"))]
    const OPTIMAL_MOBILE_THREADS: usize = 4; // Desktop: can use more
    
    let num_threads = if roots.len() < 2 * OPTIMAL_MOBILE_THREADS {
        // Small workload: single-threaded to avoid overhead
        1
    } else {
        // Larger workload: use limited parallelism
        OPTIMAL_MOBILE_THREADS.min(rayon::current_num_threads())
    };
    
    let chunk_size = if roots.len() <= num_threads {
        1 // Maximum work-stealing flexibility
    } else {
        // Larger chunks for better cache locality
        (roots.len() / (num_threads * 2)).max(1).min(4)
    };
    
    // Removed verbose logging - only log at function entry/exit for performance

    // Use custom thread pool for iOS to limit parallelism
    let partial_results: Vec<FxHashMap<CacheKey, ChaosOddsCacheItem>> = if num_threads == 1 {
        // Single-threaded: avoid rayon overhead entirely
        let mut ctx = WorkerContext::new();
        for root in &roots {
            run_dfs(
                root,
                &mut ctx,
                &groups,
                &group_is_frost,
                group_len,
                revealed_frost_count,
                &precomputed_multinomial,
                &prob_table,
            );
        }
        vec![ctx.local_cache]
    } else {
        // Multi-threaded: use rayon with limited parallelism
        use rayon::ThreadPoolBuilder;
        let pool = ThreadPoolBuilder::new()
            .num_threads(num_threads)
            .build()
            .unwrap_or_else(|_| {
                // Fallback to default pool if custom pool creation fails (silent fallback)
                rayon::ThreadPoolBuilder::new().build().unwrap()
            });
        
        pool.install(|| {
            roots
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
                    // Removed eprintln! from hot loop - causes IO blocking in multi-threaded mode
                    ctx.local_cache
                })
                .collect()
        })
    };
    // Removed verbose logging - only log at function entry/exit for performance

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
    // Removed verbose logging - only log at function entry/exit for performance

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
    // Removed verbose logging - only log at function entry/exit for performance
    eprintln!(
        "[get_chaos_bag_modifiers] TOTAL TIME: {:?}",
        start.elapsed()
    );

    cache
}
