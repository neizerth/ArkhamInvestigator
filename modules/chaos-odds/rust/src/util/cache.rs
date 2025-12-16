use std::hash::{Hash, Hasher};

use crate::types::Counts;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CacheKey {
    reveal_map: Counts,
    modifier: i16,
    pending_reveal: usize,
    // available_count removed - computed from reveal_map: total - sum(reveal_map)
}

impl Hash for CacheKey {
    fn hash<H: Hasher>(&self, state: &mut H) {
        // Hash the reveal_map efficiently
        self.reveal_map.hash(state);
        self.modifier.hash(state);
        self.pending_reveal.hash(state);
    }
}

pub fn build_cache_key(
    reveal_map: &[u8],
    _available_count: usize, // Kept for compatibility but not used (computed from reveal_map)
    modifier: i16,
    pending_reveal: usize,
) -> CacheKey {
    CacheKey {
        reveal_map: reveal_map.into(),
        modifier,
        pending_reveal,
    }
}
