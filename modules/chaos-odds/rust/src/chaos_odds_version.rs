use std::ffi::CString;
use std::os::raw::c_char;

/// Get the version string from Cargo.toml
/// Returns a pointer to a C string containing the version (e.g., "1.0.1")
/// The string is allocated with CString and must be freed by the caller
///
/// # Safety
/// The returned pointer must be freed by calling `memory_free_string`
/// after use to avoid memory leaks!
#[no_mangle]
pub extern "C" fn chaos_odds_version() -> *mut c_char {
    // CRITICAL: Catch panic to prevent UB when called from C++
    std::panic::catch_unwind(|| {
        let version = env!("CARGO_PKG_VERSION");
        match CString::new(version) {
            Ok(cstr) => cstr.into_raw(),
            Err(_) => std::ptr::null_mut(),
        }
    }).unwrap_or_else(|_| {
        eprintln!("⏱️ [Rust] chaos_odds_version() panicked - returning null");
        std::ptr::null_mut()
    })
}
