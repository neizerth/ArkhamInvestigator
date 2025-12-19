use std::os::raw::c_char;

use crate::odds::calculate_odds;
use crate::util::cancel::reset_cancel_flag;
use crate::util::parse::{parse_tokens, serialize_matrix};
// Import the function that initializes the multinomial cache
// This is called lazily on first use to precompute multinomial values
use crate::modifiers::prewarm_multinomial_cache;

/// Parse JSON string to vector of ChaosOddsToken
/// Calculate chaos bag odds for all difficulty/skill combinations
///
/// # Parameters
/// * `available_ptr` - JSON string with available tokens
/// * `revealed_ptr` - JSON string with already revealed tokens (optional, currently unused)
///
/// # Returns
/// * Pointer to JSON string with 100x100 matrix of u16 values (0-100, where 100 = 100%)
/// * Returns null pointer on error or if calculation was cancelled (call `chaos_odds_cancel()` to cancel)
///
/// # Safety
/// **IMPORTANT**: The returned pointer must be freed by calling `memory_free_string`
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
///     memory_free_string(result);
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
pub extern "C" fn chaos_odds_calculate(
    available_ptr: *const c_char,
    revealed_ptr: *const c_char,
) -> *mut c_char {
    // Initialize multinomial cache on first call (lazy initialization)
    // This ensures the cache is ready before calculation starts
    // On first call, this may take 10-30 seconds, but subsequent calls will be fast
    let _ = prewarm_multinomial_cache();

    // Reset cancellation flag before starting calculation
    reset_cancel_flag();

    // Parse available tokens
    let available = parse_tokens(available_ptr);
    let revealed = parse_tokens(revealed_ptr);

    match calculate_odds(&available, &revealed) {
        Some(odds_matrix) => {
            // Matrix already contains values 0-100 (percentages)
            serialize_matrix(&odds_matrix)
        }
        None => {
            // Calculation was cancelled, return null pointer
            std::ptr::null_mut()
        }
    }
}
