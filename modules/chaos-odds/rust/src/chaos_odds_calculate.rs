use std::os::raw::c_char;

use crate::get_chaos_bag_modifiers;
use crate::util::chaos_bag::is_auto_fail;
use crate::util::parse::{parse_tokens, serialize_matrix};
use crate::ChaosOddsToken;

/// Parse JSON string to vector of ChaosOddsToken
/// Calculate chaos bag odds for all difficulty/skill combinations
///
/// # Parameters
/// * `available_ptr` - JSON string with available tokens
/// * `revealed_ptr` - JSON string with already revealed tokens (optional, currently unused)
///
/// # Returns
/// * Pointer to JSON string with 100x100 matrix of u16 values (0-10000, where 10000 = 100%)
/// * Returns null pointer on error
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
    // Parse available tokens
    let available = parse_tokens(available_ptr);
    let revealed = parse_tokens(revealed_ptr);

    let odds_matrix = calculate_odds(&available, &revealed);
    let scaled_matrix: Vec<Vec<u16>> = odds_matrix
        .iter()
        .map(|row| {
            row.iter()
                .map(|value| (value * 10_000.0).round() as u16)
                .collect()
        })
        .collect();

    serialize_matrix(&scaled_matrix)
}

pub fn calculate_odds(available: &[ChaosOddsToken], revealed: &[ChaosOddsToken]) -> Vec<Vec<f64>> {
    let mut odds_matrix: Vec<Vec<f64>> = vec![vec![0.0; 100]; 100];

    if is_auto_fail(&revealed) {
        return odds_matrix;
    }

    let revealed_frost_count = revealed
        .iter()
        .filter(|token| token.token_type == "frost")
        .count();

    let modifiers = get_chaos_bag_modifiers(&available, revealed_frost_count);
    let fail_probability: f64 = modifiers
        .iter()
        .filter(|m| m.is_fail)
        .map(|m| m.probability)
        .sum();
    let zero_difficulty_success = 1.0 - fail_probability;

    for skill in 0..100 {
        for difficulty in 0..100 {
            if difficulty == 0 {
                odds_matrix[skill][difficulty] = zero_difficulty_success;
                continue;
            }

            let mut probability = 0.0;

            for m in &modifiers {
                // Skip any draw that results in an auto-fail sentinel
                if m.is_fail {
                    continue;
                }

                let total = skill as i16 + m.modifier;
                if total >= difficulty as i16 {
                    probability += m.probability;
                }
            }

            odds_matrix[skill][difficulty] = probability;
        }
    }

    odds_matrix
}
