use crate::get_chaos_bag_modifiers;
use crate::odds::get_auto_fail_odds;
use crate::types::ChaosOddsToken;
use crate::util::cancel::check_cancel;
use crate::util::chaos_bag::is_auto_fail;

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
    let auto_fail_odds = get_auto_fail_odds(&available, revealed_frost_count);

    let zero_difficulty_odds = 100u16.saturating_sub(auto_fail_odds as u16);

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

            let mut probability = 0.0;
            let difficulty_i16 = difficulty as i16;

            for m in &modifiers {
                let sum = skill_i16 + m.modifier + revealed_modifier;
                if sum >= difficulty_i16 {
                    probability += m.probability;
                }
            }

            // Convert to percentage (0-100) and round
            odds_matrix[skill][difficulty] = (probability * 100.0).round() as u16;
        }
    }

    Some(odds_matrix)
}
