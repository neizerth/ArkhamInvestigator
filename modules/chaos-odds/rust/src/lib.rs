use serde::{Deserialize, Serialize};
use std::ffi::CStr;
use std::os::raw::c_char;

mod chaos_bag;

#[derive(Debug, Deserialize, Serialize)]
pub struct ChaosToken {
    pub token_type: String,
    pub value: i32,
    pub is_fail: bool,
    pub is_success: bool,
    pub reveal_count: u32,
}

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

// FFI exports for C++
#[no_mangle]
pub extern "C" fn chaos_odds_calculate(
    available_ptr: *const c_char,
    revealed_ptr: *const c_char,
) -> f64 {
    // Parse available tokens
    let available = match parse_tokens(available_ptr) {
        Ok(tokens) => tokens,
        Err(e) => {
            eprintln!("Failed to parse available tokens: {}", e);
            return 0.0;
        }
    };

    // Parse revealed tokens
    let revealed = match parse_tokens(revealed_ptr) {
        Ok(tokens) => tokens,
        Err(e) => {
            eprintln!("Failed to parse revealed tokens: {}", e);
            return 0.0;
        }
    };

    // Check for auto-fail in revealed tokens
    if chaos_bag::is_auto_fail(&revealed) {
        return 0.0;
    }
    // Check for auto-success in revealed tokens
    if chaos_bag::is_auto_success(&revealed) {
        return 100.0;
    }

    // Placeholder implementation - always returns 25
    // TODO: Implement actual odds calculation algorithm
    println!(
        "Calculating odds with {} available and {} revealed tokens",
        available.len(),
        revealed.len()
    );
    25.0
}