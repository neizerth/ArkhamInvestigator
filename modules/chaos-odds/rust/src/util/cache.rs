use std::hash::{Hash, Hasher};
use smallvec::SmallVec;

/// Pack counts into u128 (state2): each count uses 3 bits, supports up to 32 groups
/// Max count per group is 7 (values 0-7).
#[inline(always)]
pub fn pack_available_counts(counts: &[u8]) -> u128 {
    let mut packed = 0u128;
    for (i, &c) in counts.iter().enumerate().take(32) {
        let count = c.min(7) as u128; // Clamp to max 7
        packed |= count << (i * 3);
    }
    packed
}

/// Unpack counts from u64 into array
#[inline(always)]
pub fn unpack_available_counts(packed: u64, group_len: usize) -> [u8; 32] {
    let mut counts = [0u8; 32];
    for i in 0..group_len.min(32) {
        counts[i] = ((packed >> (i * 3)) & 0x7) as u8;
    }
    counts
}

/// Get count for a specific group from packed state2 (u128)
#[inline(always)]
pub fn get_available_count(state2: u128, group_idx: usize) -> u8 {
    if group_idx >= 32 {
        return 0; // Out of range
    }
    ((state2 >> (group_idx * 3)) & 0x7) as u8
}

/// Set count for a specific group in packed state2 (u128)
#[inline(always)]
pub fn set_available_count(state2: u128, group_idx: usize, count: u8) -> u128 {
    if group_idx >= 32 {
        return state2; // Can't store for groups > 32
    }
    let count = count.min(7) as u128; // Clamp to max 7
    let mask = !(0x7u128 << (group_idx * 3));
    (state2 & mask) | (count << (group_idx * 3))
}

/// Decrement count for a specific group in packed state2 (u128)
#[inline(always)]
pub fn dec_available_count(state2: u128, group_idx: usize) -> u128 {
    if group_idx >= 32 {
        return state2; // Can't modify for groups > 32
    }
    let current = get_available_count(state2, group_idx);
    if current > 0 {
        set_available_count(state2, group_idx, current - 1)
    } else {
        state2
    }
}

/// Increment count for a specific group in packed state2 (u128)
#[inline(always)]
pub fn inc_available_count(state2: u128, group_idx: usize) -> u128 {
    if group_idx >= 32 {
        return state2; // Can't modify for groups > 32
    }
    let current = get_available_count(state2, group_idx);
    if current < 7 {
        set_available_count(state2, group_idx, current + 1)
    } else {
        state2
    }
}

/// Extract available_mask from state1 (bits 0-31)
#[inline(always)]
pub fn get_available_mask(state1: u128) -> u32 {
    (state1 & 0xFFFFFFFF) as u32
}

/// Extract reveal from state1 (bits 32-127)
#[inline(always)]
pub fn get_reveal(state1: u128) -> u128 {
    state1 >> 32
}

/// Set available_mask in state1 (bits 0-31)
#[inline(always)]
pub fn set_available_mask(state1: u128, mask: u32) -> u128 {
    (state1 & !0xFFFFFFFFu128) | (mask as u128)
}

/// Set reveal in state1 (bits 32-127)
#[inline(always)]
pub fn set_reveal(state1: u128, reveal: u128) -> u128 {
    (state1 & 0xFFFFFFFF) | (reveal << 32)
}

/// Increment reveal count at index in state1 (4 bits per counter, starting at bit 32)
#[inline(always)]
pub fn inc_reveal(state1: u128, idx: usize) -> u128 {
    if idx >= 24 {
        return state1; // Max 24 groups in state1
    }
    let reveal = get_reveal(state1);
    let new_reveal = reveal + (1u128 << (idx * 4));
    set_reveal(state1, new_reveal)
}

/// Get reveal count at index from state1
#[inline(always)]
pub fn get_reveal_count(state1: u128, idx: usize) -> u8 {
    if idx >= 24 {
        return 0;
    }
    let reveal = get_reveal(state1);
    ((reveal >> (idx * 4)) & 0xF) as u8
}

/// Unpack reveal counts from state1 (for multinomial calculation)
#[inline]
pub fn unpack_reveal(state1: u128, group_len: usize) -> SmallVec<[u8; 32]> {
    let reveal = get_reveal(state1);
    let mut counts = SmallVec::with_capacity(group_len.min(24));
    for i in 0..group_len.min(24) {
        let count = ((reveal >> (i * 4)) & 0xF) as u8;
        if count > 0 {
            counts.push(count);
        }
    }
    counts
}

/// Pack sorted reveal counts into u128 for use as cache key
/// This eliminates the need for SmallVec and sorting in hot loop
/// Structure: up to 32 counts, each 4 bits (max 15), sorted by value
#[inline]
pub fn pack_sorted_counts_for_multinomial(counts: &[u8]) -> u128 {
    let mut packed = 0u128;
    let mut sorted_counts = [0u8; 32];
    let mut len = 0;
    
    // Collect non-zero counts
    for &count in counts {
        if count > 0 && len < 32 {
            sorted_counts[len] = count;
            len += 1;
        }
    }
    
    // Sort in-place (small array, insertion sort is fine)
    if len > 1 {
        for i in 1..len {
            let key = sorted_counts[i];
            let mut j = i;
            while j > 0 && sorted_counts[j - 1] > key {
                sorted_counts[j] = sorted_counts[j - 1];
                j -= 1;
            }
            sorted_counts[j] = key;
        }
    }
    
    // Pack sorted counts into u128 (4 bits per count, max 32 counts)
    for (i, &count) in sorted_counts.iter().take(32).enumerate() {
        packed |= (count as u128 & 0xF) << (i * 4);
    }
    
    // Also store length in upper bits (bits 128-135, but we only have 128 bits)
    // Use bits 124-127 for length (4 bits, max 15, but we need up to 32)
    // Actually, we can use a different approach: store length separately or use a sentinel
    
    packed
}

/// Extract reveal from state1 and pack as sorted multinomial key
/// This is the fast path that avoids SmallVec allocation and sorting
#[inline]
pub fn pack_reveal_as_multinomial_key(state1: u128, group_len: usize) -> u128 {
    let reveal = get_reveal(state1);
    let mut counts = [0u8; 32];
    let mut len = 0;
    
    // Extract non-zero counts
    for i in 0..group_len.min(24) {
        let count = ((reveal >> (i * 4)) & 0xF) as u8;
        if count > 0 && len < 32 {
            counts[len] = count;
            len += 1;
        }
    }
    
    if len == 0 {
        return 0;
    }
    
    // Sort in-place (insertion sort for small arrays)
    if len > 1 {
        for i in 1..len {
            let key = counts[i];
            let mut j = i;
            while j > 0 && counts[j - 1] > key {
                counts[j] = counts[j - 1];
                j -= 1;
            }
            counts[j] = key;
        }
    }
    
    // Pack sorted counts into u128 (4 bits per count, max 32 counts = 128 bits)
    let mut packed = 0u128;
    for (i, &count) in counts.iter().take(32).enumerate() {
        packed |= (count as u128 & 0xF) << (i * 4);
    }
    
    packed
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CacheKey {
    reveal: u128,
    modifier: i16,
    available: u8,
    pending: u8,
}

impl Hash for CacheKey {
    fn hash<H: Hasher>(&self, state: &mut H) {
        // Hash packed values directly - O(1) operation
        self.reveal.hash(state);
        self.modifier.hash(state);
        self.available.hash(state);
        self.pending.hash(state);
    }
}

pub fn build_cache_key(
    state1: u128, // Combined state (available_mask + reveal)
    state2: u128, // Available counts
    available_count: usize,
    modifier: i16,
    pending_reveal: usize,
) -> CacheKey {
    // Combine state1 and state2 for hashing (XOR for fast combination)
    CacheKey {
        reveal: state1 ^ (state2 << 1), // Combine both states for hashing
        modifier,
        available: available_count.min(255) as u8,
        pending: pending_reveal.min(255) as u8,
    }
}
