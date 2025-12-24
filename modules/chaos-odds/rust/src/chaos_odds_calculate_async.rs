use std::ffi::CString;
use std::os::raw::c_char;
use std::thread;

use crate::odds::calculate_odds;
use crate::util::parse::{parse_tokens, serialize_matrix};

/// Callback function type for async calculation results
/// Called from background thread when calculation completes
/// callback_id: identifier for the callback (used by C++ to find corresponding resolve/reject)
/// result_ptr: pointer to JSON string result, or null if calculation was cancelled/errored
type AsyncCallback = extern "C" fn(u32, *const c_char);

/// Calculate chaos bag odds asynchronously in background thread
///
/// # Parameters
/// * `available_ptr` - JSON string with available tokens
/// * `revealed_ptr` - JSON string with already revealed tokens
/// * `callback_id` - Unique identifier for this calculation (passed to callback)
/// * `callback` - C callback function to call with result (called from background thread)
///
/// # Safety
/// The callback is called from a background thread. The caller is responsible for:
/// - Ensuring the callback is thread-safe
/// - Freeing the result pointer using `memory_free_string` after use
///
/// # Returns
/// Returns immediately. Result is delivered via callback from background thread.
#[no_mangle]
pub extern "C" fn chaos_odds_calculate_async(
    available_ptr: *const c_char,
    revealed_ptr: *const c_char,
    callback_id: u32,
    callback: AsyncCallback,
) {
    if callback as usize == 0 {
        eprintln!("[Rust] chaos_odds_calculate_async: null callback provided");
        return;
    }

    // Copy C strings before moving to thread (must be valid for entire thread lifetime)
    let available_str = if available_ptr.is_null() {
        eprintln!("[Rust] chaos_odds_calculate_async: null available_ptr");
        return;
    } else {
        unsafe {
            match std::ffi::CStr::from_ptr(available_ptr).to_str() {
                Ok(s) => s.to_string(),
                Err(e) => {
                    eprintln!("[Rust] chaos_odds_calculate_async: invalid UTF-8 in available_ptr: {}", e);
                    return;
                }
            }
        }
    };

    let revealed_str = if revealed_ptr.is_null() {
        eprintln!("[Rust] chaos_odds_calculate_async: null revealed_ptr");
        return;
    } else {
        unsafe {
            match std::ffi::CStr::from_ptr(revealed_ptr).to_str() {
                Ok(s) => s.to_string(),
                Err(e) => {
                    eprintln!("[Rust] chaos_odds_calculate_async: invalid UTF-8 in revealed_ptr: {}", e);
                    return;
                }
            }
        }
    };

    // Spawn background thread to perform calculation (detached)
    thread::spawn(move || {
        use std::time::Instant;
        let rust_start = Instant::now();
        eprintln!("⏱️ [Rust] chaos_odds_calculate_async() background thread started");

        // Convert strings back to C strings for parse_tokens
        let available_cstr = match CString::new(available_str.as_str()) {
            Ok(c) => c,
            Err(e) => {
                eprintln!("[Rust] chaos_odds_calculate_async: failed to create CString for available: {}", e);
                callback(callback_id, std::ptr::null());
                return;
            }
        };
        let revealed_cstr = match CString::new(revealed_str.as_str()) {
            Ok(c) => c,
            Err(e) => {
                eprintln!("[Rust] chaos_odds_calculate_async: failed to create CString for revealed: {}", e);
                callback(callback_id, std::ptr::null());
                return;
            }
        };

        // Parse tokens
        let parse_start = Instant::now();
        let available = parse_tokens(available_cstr.as_ptr());
        let revealed = parse_tokens(revealed_cstr.as_ptr());
        let parse_duration = parse_start.elapsed();
        eprintln!("⏱️ [Rust] parse_tokens took {:?}", parse_duration);

        // Perform calculation
        let calc_start = Instant::now();
        eprintln!("⏱️ [Rust] Starting calculate_odds() in background thread");
        let result_ptr = match calculate_odds(&available, &revealed) {
            Some(odds_matrix) => {
                let calc_duration = calc_start.elapsed();
                eprintln!(
                    "⏱️ [Rust] calculate_odds() completed in {:?}",
                    calc_duration
                );

                // Serialize result (returns *mut c_char)
                let serialize_start = Instant::now();
                let ptr = serialize_matrix(&odds_matrix);
                let serialize_duration = serialize_start.elapsed();
                eprintln!("⏱️ [Rust] serialize_matrix took {:?}", serialize_duration);
                
                if ptr.is_null() {
                    eprintln!("[Rust] chaos_odds_calculate_async: serialize_matrix returned null");
                    callback(callback_id, std::ptr::null());
                    return;
                }
                
                ptr
            }
            None => {
                let calc_duration = calc_start.elapsed();
                eprintln!(
                    "⏱️ [Rust] calculate_odds() was cancelled after {:?}",
                    calc_duration
                );
                // Calculation was cancelled, return null
                callback(callback_id, std::ptr::null());
                return;
            }
        };

        let rust_total = rust_start.elapsed();
        eprintln!(
            "⏱️ [Rust] chaos_odds_calculate_async() total time: {:?}",
            rust_total
        );

        eprintln!("⏱️ [Rust] chaos_odds_calculate_async() calling callback with result pointer (callback_id: {})", callback_id);
        
        // Call callback from background thread with callback_id and result pointer
        // Caller is responsible for freeing the pointer using memory_free_string
        callback(callback_id, result_ptr);
        
        eprintln!("⏱️ [Rust] chaos_odds_calculate_async() callback completed, background thread finishing (callback_id: {})", callback_id);
        eprintln!("⏱️ [Rust] Thread {} exiting at {:?}", callback_id, std::time::Instant::now());
    });

    eprintln!("⏱️ [Rust] chaos_odds_calculate_async() spawned background thread, returning immediately");
}
