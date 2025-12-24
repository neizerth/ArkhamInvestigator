pub mod config;
mod r#impl;
pub mod modifiers;
pub mod token_odds;
pub mod types;
pub mod util;

// ============================================================================
// NOTE: Rayon initialization removed
// ============================================================================
// Previously, we initialized a global Rayon thread pool to limit threads for CPU
// starvation prevention. However, since we don't actually use parallel iterators
// (par_iter) or other Rayon parallel operations in the codebase, the global pool
// was creating idle worker threads that continued consuming CPU resources after
// calculations completed.
//
// The global Rayon pool is only needed if we use parallel operations like:
// - vec.par_iter()
// - rayon::join()
// - rayon::scope()
//
// Since we don't use these, removing the pool initialization prevents background
// threads from consuming CPU after calculations complete.

// Removed init_rayon_pool_if_needed() - Rayon not used for parallel processing
// The global Rayon thread pool was creating idle worker threads that consumed CPU
// resources after calculations completed. Since we don't use par_iter or other
// parallel operations, the pool initialization has been removed.

// Declare modules FIRST - before any pub use (critical for iOS staticlib)
mod chaos_odds_calculate;
mod chaos_odds_calculate_async;
mod chaos_odds_calculate_item;
mod chaos_odds_find_tokens;
pub mod odds;

pub use modifiers::get_chaos_bag_modifiers;
pub use types::{ChaosOddsToken, TokenTarget};
pub use util::memory::memory_free_string;
pub use util::parse::{parse_tokens, parse_tokens_json, serialize_matrix};

// Re-export public functions (AFTER module declarations)
pub use chaos_odds_calculate::chaos_odds_calculate;
pub use chaos_odds_calculate_async::chaos_odds_calculate_async;
pub use chaos_odds_calculate_item::chaos_odds_calculate_item;
pub use chaos_odds_find_tokens::chaos_odds_find_tokens;
pub use odds::{calculate_odds, calculate_odds_item};
pub use token_odds::get_token_odds;
pub use util::cancel::chaos_odds_cancel;

// Force inclusion of all FFI functions using #[used] static pattern
// This is the ONLY reliable way to ensure FFI symbols are included in staticlib on iOS
// NOTE: Each export must reference the function from its original module location
#[used]
#[allow(dead_code)]
static CHAOS_ODDS_EXPORT_CALCULATE: extern "C" fn(
    *const std::os::raw::c_char,
    *const std::os::raw::c_char,
) -> *mut std::os::raw::c_char = chaos_odds_calculate;

#[used]
#[allow(dead_code)]
static CHAOS_ODDS_EXPORT_FIND_TOKENS: extern "C" fn(
    *const std::os::raw::c_char,
    *const std::os::raw::c_char,
    *const std::os::raw::c_char,
) -> *mut std::os::raw::c_char = chaos_odds_find_tokens;

#[used]
#[allow(dead_code)]
static CHAOS_ODDS_EXPORT_CALCULATE_ITEM: extern "C" fn(
    *const std::os::raw::c_char,
    *const std::os::raw::c_char,
    u32,
    u32,
) -> *mut std::os::raw::c_char = chaos_odds_calculate_item;

#[used]
#[allow(dead_code)]
static CHAOS_ODDS_EXPORT_CANCEL: extern "C" fn() = chaos_odds_cancel;

#[used]
#[allow(dead_code)]
static CHAOS_ODDS_EXPORT_CALCULATE_ASYNC: extern "C" fn(
    *const std::os::raw::c_char,
    *const std::os::raw::c_char,
    u32,
    extern "C" fn(u32, *const std::os::raw::c_char),
) = chaos_odds_calculate_async;
