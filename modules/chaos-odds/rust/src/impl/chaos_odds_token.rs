use crate::{
    config::{AUTO_FAIL, AUTO_SUCCESS},
    types::ChaosOddsToken,
};

impl ChaosOddsToken {
    /// Convert token to modifier value with auto-fail/success sentinels.
    /// Uses i8 bounds to stay within token value domain.
    pub fn as_modifier(&self) -> i16 {
        if self.is_fail {
            AUTO_FAIL
        } else if self.is_success {
            AUTO_SUCCESS
        } else {
            self.value as i16
        }
    }
}
