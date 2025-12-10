use std::ffi::CString;
use std::os::raw::c_char;

/// Free the string allocated by chaos_odds_calculate
///
/// **CRITICAL**: This function MUST be called after using the result from
/// `chaos_odds_calculate` to avoid memory leaks!
///
/// # Parameters
/// * `ptr` - Pointer returned by `chaos_odds_calculate`
///
/// # Safety
/// * Call this function exactly once for each pointer returned by `chaos_odds_calculate`
/// * Do not use the pointer after calling this function
/// * Safe to call with null pointer (will do nothing)
///
/// # Usage Pattern
/// ```cpp
/// // 1. Calculate odds
/// const char* result = chaos_odds_calculate(available);
///
/// // 2. Use the result
/// if (result != nullptr) {
///     std::string json(result);
///     // ... process json ...
///     
///     // 3. ALWAYS free the memory after use
///     chaos_odds_free_string(result);
/// }
/// ```
#[no_mangle]
pub extern "C" fn chaos_odds_free_string(ptr: *mut c_char) {
    if !ptr.is_null() {
        unsafe {
            let _ = CString::from_raw(ptr);
        }
    }
}
