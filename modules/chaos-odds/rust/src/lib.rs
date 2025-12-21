pub mod config;
mod r#impl;
pub mod modifiers;
pub mod token_odds;
pub mod types;
pub mod util;

pub use modifiers::get_chaos_bag_modifiers;
pub use types::{ChaosOddsToken, TokenTarget};
pub use util::memory::memory_free_string;
pub use util::parse::{parse_tokens, parse_tokens_json, serialize_matrix};

// Re-export public functions
pub use chaos_odds_calculate::chaos_odds_calculate;
pub use chaos_odds_find_tokens::chaos_odds_find_tokens;
pub use odds::{calculate_odds, calculate_odds_item};
pub use token_odds::get_token_odds;
pub use util::cancel::chaos_odds_cancel;

mod chaos_odds_calculate;
mod chaos_odds_find_tokens;
pub mod odds;

// Force inclusion of FFI functions to prevent dead code elimination
// This ensures all exported symbols are present in the static library
// Similar to how iOS uses -force_load flag
// For chaos_odds_prewarm, we use pub static CHAOS_ODDS_PREWARM_EXPORT in the module itself
#[allow(dead_code)]
#[inline(never)]
fn _force_include_ffi_functions() {
    // Reference FFI functions to prevent optimization
    // This ensures they are included even if not used internally
    let _fn_ptr1: extern "C" fn(
        *const std::os::raw::c_char,
        *const std::os::raw::c_char,
    ) -> *mut std::os::raw::c_char = chaos_odds_calculate;
    let _fn_ptr2: extern "C" fn(
        *const std::os::raw::c_char,
        *const std::os::raw::c_char,
        *const std::os::raw::c_char,
    ) -> *mut std::os::raw::c_char = chaos_odds_find_tokens;
    let _fn_ptr3: extern "C" fn() = chaos_odds_cancel;
}
