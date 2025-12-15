use serde::{Deserialize, Serialize};
use smallvec::SmallVec;

pub type Counts = SmallVec<[u8; 32]>;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct ChaosOddsToken {
    #[serde(rename = "type")]
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
    pub available_map: Counts,
    pub available_count: usize,
    pub reveal_map: Counts,
    pub pending_reveal: usize,
}

#[derive(Clone, Debug, Serialize)]
pub struct ChaosBagModifier {
    pub modifier: i16,
    pub probability: f64,
}
