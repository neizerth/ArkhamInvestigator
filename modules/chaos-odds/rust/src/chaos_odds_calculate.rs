use rayon::prelude::*;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;

use crate::ChaosToken;

/// Parse JSON string to vector of ChaosToken
fn parse_tokens(json_ptr: *const c_char) -> Result<Vec<ChaosToken>, String> {
    if json_ptr.is_null() {
        return Err("Null pointer provided".to_string());
    }

    let json_cstr = unsafe { CStr::from_ptr(json_ptr) };
    let json_str = json_cstr
        .to_str()
        .map_err(|e| format!("Invalid UTF-8: {}", e))?;

    serde_json::from_str::<Vec<ChaosToken>>(json_str)
        .map_err(|e| format!("JSON parse error: {}", e))
}

/// Serialize matrix to JSON and return as C string
fn serialize_matrix(matrix: &Vec<Vec<u16>>) -> *mut c_char {
    match serde_json::to_string(matrix) {
        Ok(json) => match CString::new(json) {
            Ok(c_str) => c_str.into_raw(),
            Err(e) => {
                eprintln!("Failed to create CString: {}", e);
                std::ptr::null_mut()
            }
        },
        Err(e) => {
            eprintln!("Failed to serialize matrix: {}", e);
            std::ptr::null_mut()
        }
    }
}

/// Calculate chaos bag odds for all difficulty/skill combinations
///
/// # Parameters
/// * `available_ptr` - JSON string with available tokens
///
/// # Returns
/// * Pointer to JSON string with 100x100 matrix of u16 values (0-10000, where 10000 = 100%)
/// * Returns null pointer on error
///
/// # Safety
/// **IMPORTANT**: The returned pointer must be freed by calling `chaos_odds_free_string`
/// after use to avoid memory leaks!
///
/// # Example Usage (C++)
/// ```cpp
/// const char* result = chaos_odds_calculate(available_json);
/// if (result != nullptr) {
///     // Parse and use the JSON result
///     std::string json_str(result);
///     // ... process the data ...
///     
///     // MUST free the memory after use
///     chaos_odds_free_string(result);
/// }
/// ```
///
/// # Example Usage (JavaScript/React Native)
/// ```javascript
/// const resultPtr = chaosOddsCalculate(availableJson);
/// if (resultPtr !== null) {
///     const jsonString = /* read from pointer */;
///     const matrix = JSON.parse(jsonString);
///     
///     // MUST free the memory after use
///     chaosOddsFreeString(resultPtr);
/// }
/// ```
#[no_mangle]
pub extern "C" fn chaos_odds_calculate(available_ptr: *const c_char) -> *mut c_char {
    // Parse available tokens
    let available = match parse_tokens(available_ptr) {
        Ok(tokens) => tokens,
        Err(e) => {
            eprintln!("Failed to parse available tokens: {}", e);
            return std::ptr::null_mut();
        }
    };

    // Calculate actual odds
    let odds_matrix: Vec<Vec<u16>> = vec![vec![0; 100]; 100];

    // TODO: Implement actual odds calculation algorithm
    println!("Calculating odds with {} available tokens", available.len());

    serialize_matrix(&odds_matrix)
}
