use crate::types::ChaosOddsToken;
use crate::util::cancel::check_cancel;
use crate::util::chaos_bag::is_auto_fail;
use crate::{calculate_odds_item, get_chaos_bag_modifiers};

/// Calculate odds for all difficulty/skill combinations
/// Returns a 100x100 matrix where each cell [skill][difficulty] contains
/// the success probability as a percentage (0-100)
/// Returns None if calculation was cancelled
pub fn calculate_odds(
    available: &[ChaosOddsToken],
    revealed: &[ChaosOddsToken],
) -> Option<Vec<Vec<u16>>> {
    if is_auto_fail(&revealed) {
        return Some(vec![vec![0; 100]; 100]);
    }

    let revealed_frost_count = revealed
        .iter()
        .filter(|token| token.token_type == "frost")
        .count();

    // Check for cancellation before expensive calculation
    if check_cancel() {
        return None;
    }

    let modifiers = get_chaos_bag_modifiers(&available, revealed_frost_count);
    let revealed_modifier: i16 = revealed.iter().map(|token| token.value as i16).sum();

    let zero_difficulty_odds = calculate_odds_item(available, revealed, 0, 0);

    if zero_difficulty_odds.is_none() {
        return None;
    }

    let zero_difficulty_odds = zero_difficulty_odds.unwrap();

    // ============================================================================
    // FIX #4: Binning modifiers for 100x100 loop optimization
    // ============================================================================
    // Instead of iterating over all modifiers for each skill/difficulty combination,
    // bin modifiers by value and use cumulative probabilities
    // This reduces complexity from O(100 * 100 * modifiers) to O(100 * 100 + modifiers)

    // Bin modifiers: -20 to +20 range (41 buckets)
    // Each bin represents a modifier value: bin[i] = modifier value (BIN_MIN + i)
    const BIN_MIN: i16 = -20;
    const BIN_MAX: i16 = 20;
    const BIN_COUNT: usize = (BIN_MAX - BIN_MIN + 1) as usize;
    let mut modifier_bins: Vec<f64> = vec![0.0; BIN_COUNT];

    for m in &modifiers {
        // Clamp modifier to bin range and find bin index
        let modifier_clamped = m.modifier.max(BIN_MIN).min(BIN_MAX);
        let bin_idx = (modifier_clamped - BIN_MIN) as usize;
        modifier_bins[bin_idx] += m.probability;
    }

    // Pre-compute cumulative probabilities for each bin (for fast lookup)
    // cumulative[i] = sum of probabilities for all bins >= i
    // This allows O(1) lookup: if required_modifier is in bin i, use cumulative[i]
    let mut cumulative: Vec<f64> = vec![0.0; BIN_COUNT + 1];
    for i in (0..BIN_COUNT).rev() {
        cumulative[i] = cumulative[i + 1] + modifier_bins[i];
    }

    // Pre-allocate matrix: all values start at 0
    let mut odds_matrix: Vec<Vec<u16>> = vec![vec![0; 100]; 100];

    // Fill matrix for all difficulty levels (including 0)
    // Note: get_chaos_bag_modifiers already filters out fail tokens,
    // so all modifiers here are non-fail
    for skill in 0..100 {
        // Check for cancellation in outer loop
        if check_cancel() {
            return None;
        }

        let skill_i16 = skill as i16;

        odds_matrix[skill][0] = zero_difficulty_odds;

        for difficulty in 1..100 {
            // Check for cancellation in inner loop (more frequent checks)
            if check_cancel() {
                return None;
            }

            let difficulty_i16 = difficulty as i16;

            // Calculate required modifier: skill + modifier + revealed >= difficulty
            // => modifier >= difficulty - skill - revealed
            let required_modifier = difficulty_i16 - skill_i16 - revealed_modifier;

            // Find the bin index for required modifier and get cumulative probability
            // If required_modifier is outside bin range, handle edge cases
            let probability = if required_modifier > BIN_MAX {
                // Required modifier is too high - no modifiers can satisfy it
                0.0
            } else if required_modifier < BIN_MIN {
                // Required modifier is too low - all modifiers satisfy it
                cumulative[0]
            } else {
                // Required modifier is in range - find bin and use cumulative
                let bin_idx = (required_modifier - BIN_MIN) as usize;
                cumulative[bin_idx]
            };

            // Convert to percentage (0-100) and round
            odds_matrix[skill][difficulty] = (probability * 100.0).round().min(100.0) as u16;
        }
    }

    Some(odds_matrix)
}
