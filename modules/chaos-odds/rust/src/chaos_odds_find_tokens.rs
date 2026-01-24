use std::ffi::{CStr, CString};
use std::os::raw::c_char;

use crate::token_odds::get_token_odds;
use crate::types::{ChaosOddsToken, TokenTarget};

/// Parameters structure for find_tokens function
#[derive(serde::Deserialize)]
struct FindTokensParams {
    reveal_count: usize,
    revealed_frost_count: usize,
    #[serde(default)]
    use_token_reveal: bool,
}

/// Parse JSON string to calculate token odds
/// Find probability that target token types appear in drawn combination
///
/// # Parameters
/// * `targets_ptr` - JSON string with array of TokenTarget (token_type, min_count, max_count)
/// * `tokens_ptr` - JSON string with array of ChaosOddsToken
/// * `params_ptr` - JSON string with parameters: {reveal_count, revealed_frost_count, use_token_reveal}
///
/// # Returns
/// * Pointer to JSON string with number (0-100, percentage)
/// * Returns null pointer on error or if calculation was cancelled
///
/// # Safety
/// **IMPORTANT**: The returned pointer must be freed by calling `memory_free_string`
/// after use to avoid memory leaks!
///
/// # Example Usage (C++)
/// ```cpp
/// const char* result = chaos_odds_find_tokens(targets_json, tokens_json, params_json);
/// if (result != nullptr) {
///     // Parse and use the JSON result (number 0-100)
///     int percentage = /* parse JSON number from result */;
///     
///     // MUST free the memory after use
///     memory_free_string(result);
/// }
/// ```
#[no_mangle]
pub extern "C" fn chaos_odds_find_tokens(
    targets_ptr: *const c_char,
    tokens_ptr: *const c_char,
    params_ptr: *const c_char,
) -> *mut c_char {
    // CRITICAL: Catch panic to prevent UB when called from C++
    std::panic::catch_unwind(|| {
    // NOTE: reset_cancel_flag() is NOT called here to avoid race conditions.
    // Reset must be done from C++ code BEFORE calling this function,
    // AFTER ensuring previous calculations have completed.

    // Parse targets
    let targets = if targets_ptr.is_null() {
        eprintln!("Null pointer provided for targets");
        return std::ptr::null_mut();
    } else {
        let json_cstr = unsafe { CStr::from_ptr(targets_ptr) };
        match json_cstr.to_str() {
            Ok(json_str) => match serde_json::from_str::<Vec<TokenTarget>>(json_str) {
                Ok(t) => t,
                Err(e) => {
                    eprintln!("Failed to parse targets JSON: {}", e);
                    return std::ptr::null_mut();
                }
            },
            Err(e) => {
                eprintln!("Invalid UTF-8 in targets: {}", e);
                return std::ptr::null_mut();
            }
        }
    };

    // Parse tokens
    let tokens = if tokens_ptr.is_null() {
        eprintln!("Null pointer provided for tokens");
        return std::ptr::null_mut();
    } else {
        let json_cstr = unsafe { CStr::from_ptr(tokens_ptr) };
        match json_cstr.to_str() {
            Ok(json_str) => match serde_json::from_str::<Vec<ChaosOddsToken>>(json_str) {
                Ok(t) => t,
                Err(e) => {
                    eprintln!("Failed to parse tokens JSON: {}", e);
                    return std::ptr::null_mut();
                }
            },
            Err(e) => {
                eprintln!("Invalid UTF-8 in tokens: {}", e);
                return std::ptr::null_mut();
            }
        }
    };

    // Parse parameters
    let params = if params_ptr.is_null() {
        eprintln!("Null pointer provided for params");
        return std::ptr::null_mut();
    } else {
        let json_cstr = unsafe { CStr::from_ptr(params_ptr) };
        match json_cstr.to_str() {
            Ok(json_str) => match serde_json::from_str::<FindTokensParams>(json_str) {
                Ok(p) => p,
                Err(e) => {
                    eprintln!("Failed to parse params JSON: {}", e);
                    return std::ptr::null_mut();
                }
            },
            Err(e) => {
                eprintln!("Invalid UTF-8 in params: {}", e);
                return std::ptr::null_mut();
            }
        }
    };

    // Calculate token odds
    let result = get_token_odds(
        &targets,
        params.reveal_count,
        &tokens,
        params.revealed_frost_count,
        params.use_token_reveal,
    );

    // Serialize result as JSON number string
    match serde_json::to_string(&result) {
        Ok(json) => match CString::new(json) {
            Ok(c_str) => c_str.into_raw(),
            Err(e) => {
                eprintln!("Failed to create CString: {}", e);
                std::ptr::null_mut()
            }
        },
        Err(e) => {
            eprintln!("Failed to serialize result: {}", e);
            std::ptr::null_mut()
        }
    }
    }).unwrap_or_else(|_| {
        eprintln!("⏱️ [Rust] chaos_odds_find_tokens() panicked - returning null");
        std::ptr::null_mut()
    })
}
