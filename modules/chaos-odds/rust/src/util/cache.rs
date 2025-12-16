use std::hash::{Hash, Hasher};
use smallvec::SmallVec;

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
