use crate::types::ChaosOddsToken;

/// Determines if the given tokens result in an automatic failure
///
/// Returns true if:
/// - Any token has token_type = "autoFail"
/// - Any token has is_fail = true
/// - More than 1 token has token_type = "frost"
pub fn is_auto_fail(tokens: &[ChaosOddsToken]) -> bool {
    // Single pass: bail out on auto-fail token, count frosts otherwise
    let mut frost_count = 0;
    for token in tokens.iter() {
        if token.token_type == "autoFail" || token.is_fail {
            return true;
        }
        if token.token_type == "frost" {
            frost_count += 1;
            if frost_count > 1 {
                return true;
            }
        }
    }

    false
}
