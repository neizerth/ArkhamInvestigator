use serde::{Deserialize, Serialize};
use std::collections::HashMap;

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
    pub group_index: String,
    pub token: ChaosOddsToken,
    pub count: usize,
}

#[derive(Clone, Debug)]
pub struct ChaosOddsCacheItem {
    pub modifier: i16,
    pub probability: f64,
    pub available_map: HashMap<String, usize>,
    pub available_count: usize,
    pub reveal_map: HashMap<String, usize>,
    pub pending_reveal: usize,
    pub is_fail: bool,
}

#[derive(Clone, Debug, Serialize)]
pub struct ChaosBagModifier {
    pub modifier: i16,
    pub probability: f64,
    pub is_fail: bool,
}
