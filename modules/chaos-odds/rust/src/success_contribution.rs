use crate::config::{AUTO_FAIL, AUTO_SUCCESS};
use crate::ChaosToken;

#[no_mangle]
pub extern "C" fn get_regular_token_min_difficulty(token: ChaosToken) -> i16 {
    if token.is_fail {
        return AUTO_FAIL;
    }
    if token.is_success {
        return AUTO_SUCCESS;
    }
    token.value as i16
}

pub extern "C" fn get_draw1_token_success_contribution(
    tokens: &[ChaosToken],
    skill_value: u8,
    difficulty: u8,
) -> i16 {
    if difficulty == 0 {
        return AUTO_SUCCESS;
    }
    let value = token.value + skill_value;
    if value >= difficulty {
        return AUTO_SUCCESS;
    }
    AUTO_FAIL
}
