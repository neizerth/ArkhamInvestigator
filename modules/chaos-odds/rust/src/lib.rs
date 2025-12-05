use serde::{Deserialize, Serialize};
use std::ffi::CStr;
use std::os::raw::c_char;

#[derive(Debug, Deserialize, Serialize)]
pub struct ChaosToken {
    pub token_type: String,
    pub value: i32,
    pub is_fail: bool,
    pub is_success: bool,
    pub reveal_count: u32,
}

// FFI exports for C++
#[no_mangle]
pub extern "C" fn chaos_odds_add(left: u64, right: u64) -> u64 {
    left + right
}

#[no_mangle]
pub extern "C" fn chaos_odds_count(config_ptr: *const c_char) -> f64 {
    if config_ptr.is_null() {
        return 0.0;
    }

    let config_cstr = unsafe { CStr::from_ptr(config_ptr) };
    let config_str = match config_cstr.to_str() {
        Ok(s) => s,
        Err(_) => return 0.0,
    };

    match serde_json::from_str::<Vec<ChaosToken>>(config_str) {
        Ok(tokens) => tokens.len() as f64,
        Err(_) => 0.0,
    }
}