use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct ChaosToken {
    pub token_type: String,
    pub value: i8,
    pub is_fail: bool,
    pub is_success: bool,
}
