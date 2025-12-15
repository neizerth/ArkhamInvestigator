use std::ffi::{CStr, CString};
use std::os::raw::c_char;

use crate::ChaosOddsToken;

/// Parse JSON string pointer into vector of ChaosOddsToken
pub fn parse_tokens_json(json_ptr: *const c_char) -> Result<Vec<ChaosOddsToken>, String> {
    if json_ptr.is_null() {
        return Err("Null pointer provided".to_string());
    }

    let json_cstr = unsafe { CStr::from_ptr(json_ptr) };
    let json_str = json_cstr
        .to_str()
        .map_err(|e| format!("Invalid UTF-8: {}", e))?;

    serde_json::from_str::<Vec<ChaosOddsToken>>(json_str)
        .map_err(|e| format!("JSON parse error: {}", e))
}

/// Convenience wrapper that returns a parsed vector or empty vector on error (logging the cause).
pub fn parse_tokens(json_ptr: *const c_char) -> Vec<ChaosOddsToken> {
    match parse_tokens_json(json_ptr) {
        Ok(tokens) => tokens,
        Err(e) => {
            eprintln!("Failed to parse tokens: {}", e);
            Vec::new()
        }
    }
}

/// Serialize a matrix to JSON and return as an owned C string pointer
pub fn serialize_matrix(matrix: &Vec<Vec<u16>>) -> *mut c_char {
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
