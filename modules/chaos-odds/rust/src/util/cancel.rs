use std::sync::atomic::{AtomicBool, Ordering};

lazy_static::lazy_static! {
    /// Global flag for early cancellation of calculations
    static ref CANCEL_FLAG: AtomicBool = AtomicBool::new(false);
}

/// Set the cancellation flag from C/JS
/// Call this function to request cancellation of ongoing calculations
#[no_mangle]
pub extern "C" fn chaos_odds_cancel() {
    CANCEL_FLAG.store(true, Ordering::Relaxed);
}

/// Reset the cancellation flag
/// Should be called from C++ code BEFORE starting a new calculation,
/// AFTER ensuring previous calculations have completed.
/// DO NOT call from Rust FFI functions - this causes race conditions
/// where new calculations reset cancel flag for old calculations that are still running.
#[no_mangle]
pub extern "C" fn chaos_odds_reset_cancel_flag() {
    CANCEL_FLAG.store(false, Ordering::Relaxed);
}

/// Internal function - do not use directly
/// Kept for backwards compatibility but should not be called from FFI
#[allow(dead_code)]
pub fn reset_cancel_flag() {
    CANCEL_FLAG.store(false, Ordering::Relaxed);
}

/// Check if cancellation was requested
/// Returns true if cancellation was requested, false otherwise
pub fn check_cancel() -> bool {
    CANCEL_FLAG.load(Ordering::Relaxed)
}

