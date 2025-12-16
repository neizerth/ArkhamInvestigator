use serde::{Deserialize, Serialize};
use smallvec::SmallVec;

pub type Counts = SmallVec<[u8; 32]>;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ChaosOddsToken {
    pub token_type: String,
    #[serde(default)]
    pub value: i8,
    #[serde(default)]
    pub is_fail: bool,
    #[serde(default)]
    pub is_success: bool,
    #[serde(default)]
    pub reveal_count: usize,
}

#[derive(Clone, Debug)]
pub struct ChaosOddsGroup {
    pub token: ChaosOddsToken,
    pub count: usize,
    pub modifier: i8,
}

#[derive(Clone, Debug)]
pub struct ChaosOddsCacheItem {
    pub modifier: i16,
    pub probability: f64,
    pub available_mask: u32, // Bitmask: 1 bit = group is available (up to 32 groups)
    pub available_counts: u64, // Packed counts: 2 bits per group (max 3 tokens per group), up to 32 groups
    pub available_count: usize,
    pub reveal: u128, // Packed reveal counts (4 bits per counter, up to 32 groups)
    pub pending_reveal: usize,
}

#[derive(Clone, Debug, Serialize)]
pub struct ChaosBagModifier {
    pub modifier: i16,
    pub probability: f64,
}
