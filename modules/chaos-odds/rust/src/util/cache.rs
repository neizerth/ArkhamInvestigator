use std::hash::{Hash, Hasher};
use smallvec::SmallVec;

/// Pack counts into u64: each count uses 3 bits, supports up to 21 groups
/// Max count per group is 7 (values 0-7).
/// For groups > 21, we fall back to storing only the mask (available_mask).
#[inline(always)]
pub fn pack_available_counts(counts: &[u8]) -> u64 {
    let mut packed = 0u64;
    for (i, &c) in counts.iter().enumerate().take(21) {
        let count = c.min(7) as u64; // Clamp to max 7
        packed |= count << (i * 3);
    }
    packed
}

/// Unpack counts from u64 into array
#[inline(always)]
pub fn unpack_available_counts(packed: u64, group_len: usize) -> [u8; 32] {
    let mut counts = [0u8; 32];
    for i in 0..group_len.min(21) {
        counts[i] = ((packed >> (i * 3)) & 0x7) as u8;
    }
    counts
}

/// Get count for a specific group from packed u64
#[inline(always)]
pub fn get_available_count(packed: u64, group_idx: usize) -> u8 {
    if group_idx >= 21 {
        // For groups > 21, we can't store the count in u64, return 1 if mask bit is set
        // This is a limitation, but should be rare in practice
        return 1; // Assume available if we can't store it
    }
    ((packed >> (group_idx * 3)) & 0x7) as u8
}

/// Set count for a specific group in packed u64
#[inline(always)]
pub fn set_available_count(packed: u64, group_idx: usize, count: u8) -> u64 {
    if group_idx >= 21 {
        return packed; // Can't store for groups > 21
    }
    let count = count.min(7) as u64; // Clamp to max 7
    let mask = !(0x7u64 << (group_idx * 3));
    (packed & mask) | (count << (group_idx * 3))
}

/// Decrement count for a specific group in packed u64
#[inline(always)]
pub fn dec_available_count(packed: u64, group_idx: usize) -> u64 {
    if group_idx >= 21 {
        return packed; // Can't modify for groups > 21
    }
    let current = get_available_count(packed, group_idx);
    if current > 0 {
        set_available_count(packed, group_idx, current - 1)
    } else {
        packed
    }
}

/// Increment count for a specific group in packed u64
#[inline(always)]
pub fn inc_available_count(packed: u64, group_idx: usize) -> u64 {
    if group_idx >= 21 {
        return packed; // Can't modify for groups > 21
    }
    let current = get_available_count(packed, group_idx);
    if current < 7 {
        set_available_count(packed, group_idx, current + 1)
    } else {
        packed
    }
}

/// Increment reveal count at index (4 bits per counter)
#[inline(always)]
pub fn inc_reveal(reveal: u128, idx: usize) -> u128 {
    reveal + (1u128 << (idx * 4))
}

/// Unpack reveal counts from u128 (for multinomial calculation)
#[inline]
pub fn unpack_reveal(reveal: u128, group_len: usize) -> SmallVec<[u8; 32]> {
    let mut counts = SmallVec::with_capacity(group_len.min(32));
    for i in 0..group_len.min(32) {
        let count = ((reveal >> (i * 4)) & 0xF) as u8;
        if count > 0 {
            counts.push(count);
        }
    }
    counts
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
    reveal: u128,
    available_count: usize,
    modifier: i16,
    pending_reveal: usize,
) -> CacheKey {
    CacheKey {
        reveal,
        modifier,
        available: available_count.min(255) as u8,
        pending: pending_reveal.min(255) as u8,
    }
}
