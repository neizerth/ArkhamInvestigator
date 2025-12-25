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
    pub is_frost: bool,
    pub count: usize,
    pub modifier: i16,
}

#[derive(Clone, Debug)]
pub struct ChaosOddsCacheItem {
    pub modifier: i16,
    pub probability: f64,
    pub available_count: usize,
    pub state1: u128, // Combined state: bits 0-31 = available_mask, bits 32-127 = reveal (96 bits for 24 groups)
    pub state2: u128, // Packed available_counts: 3 bits per group (max 7 tokens), up to 32 groups (96 bits)
    pub pending_reveal: usize,
}

#[derive(Clone, Debug, Serialize)]
pub struct ChaosBagModifier {
    pub modifier: i16,
    pub probability: f64,
}

/// Target token type with minimum and maximum required count
#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TokenTarget {
    pub token_type: String,
    pub min_count: usize,
    #[serde(default)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_count: Option<usize>,
}
