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
    pub modifier: i16,
}

#[derive(Clone, Debug)]
pub struct ChaosOddsCacheItem {
    pub modifier: i16,
    pub probability: f64,
    pub available_count: usize,
    pub state1: u128, // Combined state: bits 0-31 = available_mask, bits 32-127 = reveal (96 bits for 24 groups)
    pub state2: u128, // Packed available_counts: 3 bits per group (max 7 tokens), up to 21 groups (63 bits)
    pub pending_reveal: usize,
}

#[derive(Clone, Debug, Serialize)]
pub struct ChaosBagModifier {
    pub modifier: i16,
    pub probability: f64,
}
