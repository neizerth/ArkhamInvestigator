use std::ffi::CString;
use std::os::raw::c_char;

use crate::odds::calculate_odds_item;
use crate::util::parse::parse_tokens;

/// Parse JSON strings and calculate odds for a specific skill/difficulty combination
///
/// # Parameters
/// * `available_ptr` - JSON string with available tokens
/// * `revealed_ptr` - JSON string with already revealed tokens
/// * `skill_value` - Skill value (0-100)
/// * `difficulty` - Difficulty value (0-100)
///
/// # Returns
/// * Pointer to JSON string with number (0-100, percentage)
/// * Returns null pointer on error or if calculation was cancelled
///
/// # Safety
/// **IMPORTANT**: The returned pointer must be freed by calling `memory_free_string`
/// after use to avoid memory leaks!
#[no_mangle]
pub extern "C" fn chaos_odds_calculate_item(
    available_ptr: *const c_char,
    revealed_ptr: *const c_char,
    skill_value: u32,
    difficulty: u32,
    ) -> *mut c_char {
    // CRITICAL: Catch panic to prevent UB when called from C++
    std::panic::catch_unwind(|| {
    // NOTE: reset_cancel_flag() is NOT called here to avoid race conditions.
    // Reset must be done from C++ code BEFORE calling this function,
    // AFTER ensuring previous calculations have completed.

    // Parse tokens
    let available = parse_tokens(available_ptr);
    let revealed = parse_tokens(revealed_ptr);

    // Convert u32 to u16 for internal calculation (ABI-safe conversion)
    let skill_value_u16 = skill_value.min(u16::MAX as u32) as u16;
    let difficulty_u16 = difficulty.min(u16::MAX as u32) as u16;

    // Calculate odds for specific skill/difficulty
    let result = match calculate_odds_item(&available, &revealed, skill_value_u16, difficulty_u16) {
        Some(probability) => {
            // Serialize result as JSON number string
            match serde_json::to_string(&probability) {
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
        }
        None => {
            // Calculation was cancelled, return null pointer
            std::ptr::null_mut()
        }
    };

    result
    }).unwrap_or_else(|_| {
        eprintln!("⏱️ [Rust] chaos_odds_calculate_item() panicked - returning null");
        std::ptr::null_mut()
    })
}

// Force inclusion using #[used] static - MUST be in same module as the function
// This is the ONLY reliable way to ensure FFI symbols are included in staticlib on iOS
#[used]
#[allow(dead_code)]
static FORCED_EXPORT: extern "C" fn(*const c_char, *const c_char, u32, u32) -> *mut c_char =
    chaos_odds_calculate_item;
