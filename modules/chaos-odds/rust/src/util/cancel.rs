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
/// Called automatically at the start of each calculation
pub fn reset_cancel_flag() {
    CANCEL_FLAG.store(false, Ordering::Relaxed);
}

/// Check if cancellation was requested
/// Returns true if cancellation was requested, false otherwise
pub fn check_cancel() -> bool {
    CANCEL_FLAG.load(Ordering::Relaxed)
}

