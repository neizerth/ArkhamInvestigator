use crate::ChaosToken;

/// Determines if the given tokens result in an automatic failure
///
/// Returns true if:
/// - Any token has token_type = "autoFail"
/// - Any token has is_fail = true
/// - More than 1 token has token_type = "frost"
pub fn is_auto_fail(tokens: &[ChaosToken]) -> bool {
    // Check if any token is an auto-fail or has fail flag
    let contains_auto_fail = tokens
        .iter()
        .any(|token| token.token_type == "autoFail" || token.is_fail);

    if contains_auto_fail {
        return true;
    }

    // Count frost tokens
    let frost_count = tokens
        .iter()
        .filter(|token| token.token_type == "frost")
        .count();

    // Auto-fail if more than 1 frost token
    frost_count > 1
}

/// Determines if the given tokens result in an automatic success
///
/// Returns true if any token has is_success = true
pub fn is_auto_success(tokens: &[ChaosToken]) -> bool {
    tokens.iter().any(|token| token.is_success)
}

pub fn get_tokens_value(tokens: &[ChaosToken]) -> i8 {
    if is_auto_fail(tokens) {
        return 0;
    }
    let value: i8 = tokens.iter().map(|token| token.value).sum();
    value
}

pub fn sum_gte_difficulty(tokens: &[ChaosToken], skill_value: i8, difficulty: i8) -> u8 {
    if difficulty == 0 {
        return 1;
    }
    let value = get_tokens_value(tokens) + skill_value;
    if value >= difficulty {
        return 1;
    }
    0
}
