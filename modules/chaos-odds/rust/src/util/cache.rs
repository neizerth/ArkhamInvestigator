use std::hash::{Hash, Hasher};

use crate::types::Counts;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CacheKey {
    reveal_map: Counts,
    available_count: usize,
    modifier: i16,
}

impl Hash for CacheKey {
    fn hash<H: Hasher>(&self, state: &mut H) {
        // Hash the reveal_map efficiently
        self.reveal_map.hash(state);
        self.available_count.hash(state);
        self.modifier.hash(state);
    }
}

pub fn build_cache_key(reveal_map: &[u8], available_count: usize, modifier: i16) -> CacheKey {
    CacheKey {
        reveal_map: reveal_map.into(),
        available_count,
        modifier,
    }
}
