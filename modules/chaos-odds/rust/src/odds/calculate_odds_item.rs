use crate::modifiers::get_chaos_bag_item_modifiers;
// use crate::odds::get_auto_fail_odds;
use crate::types::ChaosOddsToken;
use crate::util::cancel::check_cancel;
use crate::util::chaos_bag::is_auto_fail;

/// Calculate odds for a specific skill/difficulty combination
/// Returns the success probability as a percentage (0-100)
/// Returns None if calculation was cancelled
///
/// # Arguments
/// * `available` - List of available tokens in the chaos bag
/// * `revealed` - List of already revealed tokens
/// * `skill_value` - Skill value (0-100)
/// * `difficulty` - Difficulty value (0-100)
pub fn calculate_odds_item(
    available: &[ChaosOddsToken],
    revealed: &[ChaosOddsToken],
    skill_value: u16,
    difficulty: u16,
) -> Option<u16> {
    // Check for cancellation before expensive calculation
    if check_cancel() {
        return None;
    }

    // If auto-fail is already triggered by revealed tokens, return 0
    if is_auto_fail(&revealed) {
        return Some(0);
    }

    let revealed_frost_count = revealed
        .iter()
        .filter(|token| token.token_type == "frost")
        .count();

    // Check for cancellation before expensive calculation
    if check_cancel() {
        return None;
    }

    // Special case: difficulty 0
    // Success probability = 100% - auto_fail_odds
    // if difficulty == 0 {
    //     let auto_fail_odds = get_auto_fail_odds(&available, revealed_frost_count);
    //     let success_prob = 100u16.saturating_sub(auto_fail_odds as u16);
    //     return Some(success_prob);
    // }

    // Check for cancellation
    // if check_cancel() {
    //     return None;
    // }

    let revealed_modifier: i16 = revealed.iter().map(|token| token.value as i16).sum();

    // Use optimized function that filters modifiers on-the-fly
    let modifiers = get_chaos_bag_item_modifiers(
        &available,
        revealed_frost_count,
        skill_value,
        difficulty,
        revealed_modifier,
    );

    // Sum probabilities from all modifiers
    let probability: f64 = modifiers.iter().map(|m| m.probability).sum();

    // Convert to percentage (0-100) and round
    let success_prob = (probability * 100.0).round().min(100.0) as u16;

    Some(success_prob)
}
