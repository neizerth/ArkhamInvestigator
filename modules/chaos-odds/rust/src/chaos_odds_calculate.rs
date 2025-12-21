use std::os::raw::c_char;

use crate::odds::calculate_odds;
use crate::util::cancel::reset_cancel_flag;
use crate::util::parse::{parse_tokens, serialize_matrix};

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
    use std::time::Instant;

    let rust_start = Instant::now();
    eprintln!("⏱️ [Rust] chaos_odds_calculate() called");

    // Reset cancellation flag before starting calculation
    reset_cancel_flag();

    // Parse available tokens
    let parse_start = Instant::now();
    let available = parse_tokens(available_ptr);
    let revealed = parse_tokens(revealed_ptr);
    let parse_duration = parse_start.elapsed();
    eprintln!("⏱️ [Rust] parse_tokens took {:?}", parse_duration);

    let calc_start = Instant::now();
    eprintln!("⏱️ [Rust] Starting calculate_odds()");
    let result = match calculate_odds(&available, &revealed) {
        Some(odds_matrix) => {
            let calc_duration = calc_start.elapsed();
            eprintln!(
                "⏱️ [Rust] calculate_odds() completed in {:?}",
                calc_duration
            );

            // Matrix already contains values 0-100 (percentages)
            let serialize_start = Instant::now();
            let serialized = serialize_matrix(&odds_matrix);
            let serialize_duration = serialize_start.elapsed();
            eprintln!("⏱️ [Rust] serialize_matrix took {:?}", serialize_duration);
            serialized
        }
        None => {
            let calc_duration = calc_start.elapsed();
            eprintln!(
                "⏱️ [Rust] calculate_odds() was cancelled after {:?}",
                calc_duration
            );
            // Calculation was cancelled, return null pointer
            std::ptr::null_mut()
        }
    };

    let rust_total = rust_start.elapsed();
    eprintln!(
        "⏱️ [Rust] chaos_odds_calculate() total time: {:?}",
        rust_total
    );

    result
}
