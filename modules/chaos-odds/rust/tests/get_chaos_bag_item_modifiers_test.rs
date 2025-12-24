use chaos_odds::{
    calculate_odds, get_chaos_bag_modifiers, modifiers::get_chaos_bag_item_modifiers,
    ChaosOddsToken,
};

fn token(token_type: &str, value: i8) -> ChaosOddsToken {
    token_with_reveal(token_type, value, 0)
}

fn token_with_reveal(token_type: &str, value: i8, reveal_count: usize) -> ChaosOddsToken {
    ChaosOddsToken {
        token_type: token_type.to_string(),
        value,
        is_fail: false,
        is_success: false,
        reveal_count,
    }
}

#[test]
fn simple_two_tokens_required_modifier_one() {
    // Bag: +1, -1
    // skill=2, difficulty=3, revealed_modifier=0
    // Required modifier: 3 - 2 - 0 = 1
    // Only +1 satisfies: probability = 0.5
    let tokens = vec![token("plusOne", 1), token("minusOne", -1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 0.5).abs() < 1e-9,
        "expected 0.5 probability, got {}",
        total_prob
    );
    assert_eq!(result.len(), 1, "expected 1 modifier, got {}", result.len());
    assert_eq!(
        result[0].modifier, 1,
        "expected modifier=1, got {}",
        result[0].modifier
    );
}

#[test]
fn simple_three_tokens_required_modifier_one() {
    // Bag: +2, +1, -1
    // skill=2, difficulty=3, revealed_modifier=0
    // Required modifier: 3 - 2 - 0 = 1
    // Both +2 and +1 satisfy: probability = 2/3 ≈ 0.6667
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("minusOne", -1),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    let expected = 2.0 / 3.0;
    assert!(
        (total_prob - expected).abs() < 1e-9,
        "expected {} probability, got {}",
        expected,
        total_prob
    );
    assert_eq!(
        result.len(),
        2,
        "expected 2 modifiers, got {}",
        result.len()
    );
}

#[test]
fn all_modifiers_satisfy() {
    // Bag: +1, -1, 0
    // skill=10, difficulty=5, revealed_modifier=0
    // Required modifier: 5 - 10 - 0 = -5
    // All modifiers satisfy: probability = 1.0
    let tokens = vec![token("plusOne", 1), token("minusOne", -1), token("zero", 0)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 10, 5, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 1.0).abs() < 1e-9,
        "expected 1.0 probability, got {}",
        total_prob
    );
    assert_eq!(
        result.len(),
        3,
        "expected 3 modifiers, got {}",
        result.len()
    );
}

#[test]
fn no_modifiers_satisfy() {
    // Bag: +1, -1
    // skill=1, difficulty=10, revealed_modifier=0
    // Required modifier: 10 - 1 - 0 = 9
    // No tokens satisfy: probability = 0.0
    let tokens = vec![token("plusOne", 1), token("minusOne", -1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 1, 10, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 0.0).abs() < 1e-9,
        "expected 0.0 probability, got {}",
        total_prob
    );
    assert_eq!(
        result.len(),
        0,
        "expected 0 modifiers, got {}",
        result.len()
    );
}

#[test]
fn with_revealed_modifier() {
    // Bag: +1, -1
    // skill=2, difficulty=3, revealed_modifier=+1
    // Required modifier: 3 - 2 - 1 = 0
    // Both +1 and -1 satisfy (2 + 1 + 1 = 4 >= 3, 2 + (-1) + 1 = 2 < 3)
    // Actually: skill + modifier + revealed >= difficulty
    // 2 + 1 + 1 = 4 >= 3 ✓
    // 2 + (-1) + 1 = 2 < 3 ✗
    // So only +1 satisfies: probability = 0.5
    let tokens = vec![token("plusOne", 1), token("minusOne", -1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 1);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 0.5).abs() < 1e-9,
        "expected 0.5 probability with revealed_modifier=1, got {}",
        total_prob
    );
}

#[test]
fn with_revealed_modifier_all_satisfy() {
    // Bag: +1, -1
    // skill=2, difficulty=2, revealed_modifier=+1
    // Required modifier: 2 - 2 - 1 = -1
    // Both +1 and -1 satisfy: probability = 1.0
    let tokens = vec![token("plusOne", 1), token("minusOne", -1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 2, 1);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 1.0).abs() < 1e-9,
        "expected 1.0 probability with revealed_modifier=1, got {}",
        total_prob
    );
}

#[test]
fn with_bless_reveal_token() {
    // Bag: +1, bless(reveal=1, value=+2)
    // skill=2, difficulty=4, revealed_modifier=0
    // Required modifier: 4 - 2 - 0 = 2
    // Bless can reveal +1, creating chains
    // This is complex, so we just check it's reasonable (> 0 and <= 1)
    let tokens = vec![token("plusOne", 1), token_with_reveal("bless", 2, 1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 4, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob > 0.0 && total_prob <= 1.0,
        "expected reasonable probability (0 < p <= 1) with bless reveal, got {}",
        total_prob
    );
}

#[test]
fn with_curse_reveal_token() {
    // Bag: +1, curse(reveal=1, value=-2)
    // skill=2, difficulty=2, revealed_modifier=0
    // Required modifier: 2 - 2 - 0 = 0
    // Curse can reveal +1, creating chains
    // This is complex, so we just check it's reasonable (> 0 and <= 1)
    let tokens = vec![token("plusOne", 1), token_with_reveal("curse", -2, 1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 2, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob > 0.0 && total_prob <= 1.0,
        "expected reasonable probability (0 < p <= 1) with curse reveal, got {}",
        total_prob
    );
}

#[test]
fn with_frost_reveal_token() {
    // Bag: +1, frost(reveal=1, value=0)
    // skill=2, difficulty=2, revealed_modifier=0, revealed_frost_count=0
    // Required modifier: 2 - 2 - 0 = 0
    // Frost can reveal +1, creating chains
    let tokens = vec![token("plusOne", 1), token_with_reveal("frost", 0, 1)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 2, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob > 0.0 && total_prob <= 1.0,
        "expected reasonable probability (0 < p <= 1) with frost reveal, got {}",
        total_prob
    );
}

#[test]
fn matches_get_chaos_bag_modifiers_sum() {
    // Test that get_chaos_bag_item_modifiers matches the sum of probabilities
    // from get_chaos_bag_modifiers for modifiers >= required_modifier
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
        token("minusTwo", -2),
    ];

    let skill = 3;
    let difficulty = 4;
    let revealed_modifier = 0;
    let required_modifier = difficulty as i16 - skill as i16 - revealed_modifier;

    // Get all modifiers
    let all_modifiers = get_chaos_bag_modifiers(&tokens, 0);

    // Sum probabilities for modifiers >= required_modifier
    let expected_prob: f64 = all_modifiers
        .iter()
        .filter(|m| m.modifier >= required_modifier)
        .map(|m| m.probability)
        .sum();

    // Get result from optimized function
    let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, revealed_modifier);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - expected_prob).abs() < 1e-9,
        "mismatch: expected {}, got {}",
        expected_prob,
        total_prob
    );
}

#[test]
fn matches_get_chaos_bag_modifiers_with_revealed_modifier() {
    // Test with revealed_modifier
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
    ];

    let skill = 2;
    let difficulty = 4;
    let revealed_modifier = 1;
    let required_modifier = difficulty as i16 - skill as i16 - revealed_modifier;

    // Get all modifiers
    let all_modifiers = get_chaos_bag_modifiers(&tokens, 0);

    // Sum probabilities for modifiers >= required_modifier
    let expected_prob: f64 = all_modifiers
        .iter()
        .filter(|m| m.modifier >= required_modifier)
        .map(|m| m.probability)
        .sum();

    // Get result from optimized function
    let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, revealed_modifier);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - expected_prob).abs() < 1e-9,
        "mismatch with revealed_modifier: expected {}, got {}",
        expected_prob,
        total_prob
    );
}

#[test]
fn with_reveal_tokens_complex() {
    // Bag: +1, bless(reveal=1, value=+2), curse(reveal=1, value=-2)
    // skill=2, difficulty=3, revealed_modifier=0
    // Required modifier: 3 - 2 - 0 = 1
    // Complex reveal chains, so we just check it's reasonable
    let tokens = vec![
        token("plusOne", 1),
        token_with_reveal("bless", 2, 1),
        token_with_reveal("curse", -2, 1),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob >= 0.0 && total_prob <= 1.0,
        "expected probability in range [0, 1] with complex reveals, got {}",
        total_prob
    );
}

#[test]
fn empty_bag_returns_zero() {
    let tokens: Vec<ChaosOddsToken> = Vec::new();

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 0);

    assert_eq!(
        result.len(),
        0,
        "expected empty vec for empty bag, got {} items",
        result.len()
    );
}

#[test]
fn exact_match_required_modifier() {
    // Bag: +2, +1, 0, -1
    // skill=3, difficulty=5, revealed_modifier=0
    // Required modifier: 5 - 3 - 0 = 2
    // Only +2 satisfies exactly: probability = 1/4 = 0.25
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 3, 5, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 0.25).abs() < 1e-9,
        "expected 0.25 probability, got {}",
        total_prob
    );
    assert_eq!(result.len(), 1, "expected 1 modifier, got {}", result.len());
    assert_eq!(
        result[0].modifier, 2,
        "expected modifier=2, got {}",
        result[0].modifier
    );
}

#[test]
fn multiple_identical_tokens() {
    // Bag: +1, +1, +1, -1
    // skill=2, difficulty=3, revealed_modifier=0
    // Required modifier: 3 - 2 - 0 = 1
    // All three +1 tokens satisfy: probability = 3/4 = 0.75
    let tokens = vec![
        token("plusOne", 1),
        token("plusOne", 1),
        token("plusOne", 1),
        token("minusOne", -1),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob - 0.75).abs() < 1e-9,
        "expected 0.75 probability, got {}",
        total_prob
    );
}

#[test]
fn with_tablet_reveal_token() {
    // Bag: +1, tablet(reveal=2, value=0)
    // skill=2, difficulty=2, revealed_modifier=0
    // Required modifier: 2 - 2 - 0 = 0
    // Tablet reveals 2 tokens, creating complex chains
    let tokens = vec![token("plusOne", 1), token_with_reveal("tablet", 0, 2)];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 2, 2, 0);

    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob >= 0.0 && total_prob <= 1.0,
        "expected probability in range [0, 1] with tablet reveal, got {}",
        total_prob
    );
}

#[test]
fn boundary_conditions() {
    // Test various boundary conditions
    let tokens = vec![token("plusOne", 1), token("minusOne", -1)];

    // Case 1: required_modifier exactly matches
    let result1 = get_chaos_bag_item_modifiers(&tokens, 0, 2, 3, 0); // required = 1
    let total_prob1: f64 = result1.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob1 - 0.5).abs() < 1e-9,
        "boundary test 1 failed: expected 0.5, got {}",
        total_prob1
    );

    // Case 2: required_modifier just below (0)
    // For +1: 2 + 1 + 0 = 3 >= 2 ✓
    // For -1: 2 + (-1) + 0 = 1 < 2 ✗
    // So only +1 satisfies: probability = 0.5
    let result2 = get_chaos_bag_item_modifiers(&tokens, 0, 2, 2, 0); // required = 0
    let total_prob2: f64 = result2.iter().map(|m| m.probability).sum();
    assert!(
        (total_prob2 - 0.5).abs() < 1e-9,
        "boundary test 2 failed: expected 0.5, got {}",
        total_prob2
    );

    // Case 3: required_modifier just above
    let result3 = get_chaos_bag_item_modifiers(&tokens, 0, 2, 4, 0); // required = 2
    let total_prob3: f64 = result3.iter().map(|m| m.probability).sum();
    assert_eq!(
        total_prob3, 0.0,
        "boundary test 3 failed: expected 0.0, got {}",
        total_prob3
    );
}

#[test]
fn simple_bag_no_reveal_only_successful_modifiers() {
    // Bag: +1 ×1, 0 ×2, -1 ×2, -2 ×1
    // skill=4, difficulty=4, revealed_modifier=0
    // Required modifier: 4 - 4 - 0 = 0
    // Only modifiers >= 0 should appear: +1 and 0
    // -1 and -2 should NOT appear in results
    let tokens = vec![
        token("plusOne", 1),
        token("zero", 0),
        token("zero", 0),
        token("minusOne", -1),
        token("minusOne", -1),
        token("minusTwo", -2),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 4, 4, 0);

    // Check that only successful modifiers are present
    for item in &result {
        assert!(
            item.modifier >= 0,
            "found unsuccessful modifier {} in results",
            item.modifier
        );
    }

    // Check that -1 and -2 are NOT present
    let has_minus_one = result.iter().any(|m| m.modifier == -1);
    let has_minus_two = result.iter().any(|m| m.modifier == -2);
    assert!(!has_minus_one, "should not contain modifier -1");
    assert!(!has_minus_two, "should not contain modifier -2");

    // Check probabilities
    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    let expected = (1.0 / 6.0) + (2.0 / 6.0); // +1 and 0
    assert!(
        (total_prob - expected).abs() < 1e-9,
        "expected probability {}, got {}",
        expected,
        total_prob
    );

    // Check specific modifiers
    let prob_zero: f64 = result
        .iter()
        .filter(|m| m.modifier == 0)
        .map(|m| m.probability)
        .sum();
    let prob_one: f64 = result
        .iter()
        .filter(|m| m.modifier == 1)
        .map(|m| m.probability)
        .sum();

    assert!(
        (prob_zero - (2.0 / 6.0)).abs() < 1e-9,
        "expected probability 2/6 for modifier 0, got {}",
        prob_zero
    );
    assert!(
        (prob_one - (1.0 / 6.0)).abs() < 1e-9,
        "expected probability 1/6 for modifier 1, got {}",
        prob_one
    );
}

#[test]
fn bag_with_single_reveal_level() {
    // Bag: +1 ×1, 0 ×2, -1 ×2, Skull (-2, reveal 1) ×1
    // skill=5, difficulty=4, revealed_modifier=0
    // Required modifier: 4 - 5 - 0 = -1
    // Only modifiers >= -1 should appear
    let tokens = vec![
        token("plusOne", 1),
        token("zero", 0),
        token("zero", 0),
        token("minusOne", -1),
        token("minusOne", -1),
        token_with_reveal("skull", -2, 1),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 5, 4, 0);

    // Check that only successful modifiers are present (>= -1)
    for item in &result {
        assert!(
            item.modifier >= -1,
            "found unsuccessful modifier {} in results (should be >= -1)",
            item.modifier
        );
    }

    // Check that -2, -3, -4 are NOT present
    let has_minus_two = result.iter().any(|m| m.modifier == -2);
    let has_minus_three = result.iter().any(|m| m.modifier == -3);
    let has_minus_four = result.iter().any(|m| m.modifier == -4);
    assert!(!has_minus_two, "should not contain modifier -2");
    assert!(!has_minus_three, "should not contain modifier -3");
    assert!(!has_minus_four, "should not contain modifier -4");

    // Total probability should be sum of all successful outcomes
    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob > 0.0 && total_prob <= 1.0,
        "expected probability in range (0, 1], got {}",
        total_prob
    );

    // Verify that we have +1, 0, and -1 modifiers
    let has_plus_one = result.iter().any(|m| m.modifier == 1);
    let has_zero = result.iter().any(|m| m.modifier == 0);
    let has_minus_one = result.iter().any(|m| m.modifier == -1);
    assert!(has_plus_one, "should contain modifier +1");
    assert!(has_zero, "should contain modifier 0");
    assert!(has_minus_one, "should contain modifier -1");
}

#[test]
fn bag_with_reveal_chain() {
    // Bag: +1 ×1, 0 ×1, Cultist (-1, reveal 1) ×1, Tablet (-2, reveal 2) ×1
    // skill=6, difficulty=5, revealed_modifier=0
    // Required modifier: 5 - 6 - 0 = -1
    // Only modifiers >= -1 should appear
    let tokens = vec![
        token("plusOne", 1),
        token("zero", 0),
        token_with_reveal("cultist", -1, 1),
        token_with_reveal("tablet", -2, 2),
    ];

    let result = get_chaos_bag_item_modifiers(&tokens, 0, 6, 5, 0);

    // Check that only successful modifiers are present (>= -1)
    for item in &result {
        assert!(
            item.modifier >= -1,
            "found unsuccessful modifier {} in results (should be >= -1)",
            item.modifier
        );
    }

    // Check that -2, -3, -4, etc. are NOT present
    let has_minus_two = result.iter().any(|m| m.modifier == -2);
    let has_minus_three = result.iter().any(|m| m.modifier == -3);
    let has_minus_four = result.iter().any(|m| m.modifier == -4);
    assert!(!has_minus_two, "should not contain modifier -2");
    assert!(!has_minus_three, "should not contain modifier -3");
    assert!(!has_minus_four, "should not contain modifier -4");

    // Total probability should be sum of all successful outcomes
    let total_prob: f64 = result.iter().map(|m| m.probability).sum();
    assert!(
        total_prob > 0.0 && total_prob <= 1.0,
        "expected probability in range (0, 1], got {}",
        total_prob
    );

    // Verify that we have at least some successful modifiers
    assert!(
        !result.is_empty(),
        "expected at least one successful modifier"
    );
}

#[test]
fn invariant_sum_equals_success_probability() {
    // Sanity check: sum of probabilities should equal probability of success
    // This is a fundamental invariant of the function
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
        token("minusTwo", -2),
        token_with_reveal("bless", 2, 1),
        token_with_reveal("curse", -2, 1),
    ];

    let skill = 3;
    let difficulty = 4;
    let revealed_modifier = 0;
    let required_modifier = difficulty as i16 - skill as i16 - revealed_modifier;

    // Get result from optimized function
    let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, revealed_modifier);

    // Sum probabilities from optimized function
    let total_prob: f64 = result.iter().map(|m| m.probability).sum();

    // Get all modifiers and sum probabilities for successful ones
    let all_modifiers = get_chaos_bag_modifiers(&tokens, 0);
    let expected_prob: f64 = all_modifiers
        .iter()
        .filter(|m| m.modifier >= required_modifier)
        .map(|m| m.probability)
        .sum();

    // The invariant: sum should equal probability of success
    assert!(
        (total_prob - expected_prob).abs() < 1e-9,
        "invariant violated: sum of probabilities ({}) should equal success probability ({})",
        total_prob,
        expected_prob
    );

    // Also verify that all returned modifiers satisfy the condition
    for item in &result {
        assert!(
            item.modifier >= required_modifier,
            "modifier {} does not satisfy condition (>= {})",
            item.modifier,
            required_modifier
        );
    }
}

#[test]
fn invariant_sum_equals_success_probability_with_revealed() {
    // Same invariant check but with revealed_modifier
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
        token_with_reveal("bless", 2, 1),
    ];

    let skill = 2;
    let difficulty = 4;
    let revealed_modifier = 1;
    let required_modifier = difficulty as i16 - skill as i16 - revealed_modifier;

    // Get result from optimized function
    let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, revealed_modifier);

    // Sum probabilities from optimized function
    let total_prob: f64 = result.iter().map(|m| m.probability).sum();

    // Get all modifiers and sum probabilities for successful ones
    let all_modifiers = get_chaos_bag_modifiers(&tokens, 0);
    let expected_prob: f64 = all_modifiers
        .iter()
        .filter(|m| m.modifier >= required_modifier)
        .map(|m| m.probability)
        .sum();

    // The invariant: sum should equal probability of success
    assert!(
        (total_prob - expected_prob).abs() < 1e-9,
        "invariant violated with revealed_modifier: sum ({}) should equal success probability ({})",
        total_prob,
        expected_prob
    );
}

#[test]
fn only_successful_modifiers_in_results() {
    // General test: verify that function never returns modifiers that don't satisfy condition
    let tokens = vec![
        token("plusThree", 3),
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
        token("minusTwo", -2),
        token("minusThree", -3),
        token_with_reveal("bless", 2, 1),
        token_with_reveal("curse", -2, 1),
        token_with_reveal("tablet", 0, 2),
    ];

    // Test multiple skill/difficulty combinations
    let test_cases = vec![
        (3, 5, 0), // required = 2
        (4, 4, 0), // required = 0
        (5, 3, 0), // required = -2
        (2, 6, 1), // required = 3 (with revealed_modifier)
    ];

    for (skill, difficulty, revealed_modifier) in test_cases {
        let required_modifier = difficulty as i16 - skill as i16 - revealed_modifier;

        let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, revealed_modifier);

        // Every modifier in result must satisfy the condition
        for item in &result {
            assert!(
                item.modifier >= required_modifier,
                "modifier {} does not satisfy condition (>= {}) for skill={}, difficulty={}, revealed_modifier={}",
                item.modifier,
                required_modifier,
                skill,
                difficulty,
                revealed_modifier
            );
        }

        // Verify probability is reasonable
        let total_prob: f64 = result.iter().map(|m| m.probability).sum();
        assert!(
            total_prob >= 0.0 && total_prob <= 1.0,
            "total probability should be in [0, 1], got {} for skill={}, difficulty={}",
            total_prob,
            skill,
            difficulty
        );
    }
}

#[test]
fn matches_calculate_odds_matrix_simple_case() {
    // Test that get_chaos_bag_item_modifiers matches calculate_odds matrix
    let tokens = vec![token("plusOne", 1), token("minusOne", -1), token("zero", 0)];

    // Calculate full matrix
    let matrix = calculate_odds(&tokens, &[]).expect("calculate_odds should succeed");

    // Test several skill/difficulty combinations
    let test_cases = vec![
        (2, 3, 0), // skill=2, difficulty=3, revealed_modifier=0
        (5, 4, 0), // skill=5, difficulty=4, revealed_modifier=0
        (3, 3, 0), // skill=3, difficulty=3, revealed_modifier=0
    ];

    for (skill, difficulty, revealed_modifier) in test_cases {
        // Get result from get_chaos_bag_item_modifiers
        let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, revealed_modifier);
        let total_prob: f64 = result.iter().map(|m| m.probability).sum();
        let percentage = (total_prob * 100.0).round() as u16;

        // Get corresponding value from matrix
        let matrix_value = matrix[skill as usize][difficulty as usize];

        assert_eq!(
            percentage, matrix_value,
            "mismatch for skill={}, difficulty={}, revealed_modifier={}: get_chaos_bag_item_modifiers returned {}%, matrix[{}][{}] = {}%",
            skill, difficulty, revealed_modifier, percentage, skill, difficulty, matrix_value
        );
    }
}

#[test]
fn matches_calculate_odds_matrix_with_revealed() {
    // Test with revealed tokens
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
    ];

    let revealed = vec![token("plusOne", 1)]; // revealed_modifier = 1
    let revealed_modifier: i16 = revealed.iter().map(|t| t.value as i16).sum();

    // Calculate full matrix
    let matrix = calculate_odds(&tokens, &revealed).expect("calculate_odds should succeed");

    // Test several skill/difficulty combinations
    let test_cases = vec![
        (2, 4, revealed_modifier), // skill=2, difficulty=4, revealed_modifier=1
        (3, 5, revealed_modifier), // skill=3, difficulty=5, revealed_modifier=1
        (4, 4, revealed_modifier), // skill=4, difficulty=4, revealed_modifier=1
    ];

    let revealed_frost_count = revealed
        .iter()
        .filter(|t| t.token_type == "frost")
        .count();

    for (skill, difficulty, rev_mod) in test_cases {
        // Get result from get_chaos_bag_item_modifiers
        let result = get_chaos_bag_item_modifiers(&tokens, revealed_frost_count, skill, difficulty, rev_mod);
        let total_prob: f64 = result.iter().map(|m| m.probability).sum();
        let percentage = (total_prob * 100.0).round() as u16;

        // Get corresponding value from matrix
        let matrix_value = matrix[skill as usize][difficulty as usize];

        assert_eq!(
            percentage, matrix_value,
            "mismatch with revealed tokens for skill={}, difficulty={}, revealed_modifier={}: get_chaos_bag_item_modifiers returned {}%, matrix[{}][{}] = {}%",
            skill, difficulty, rev_mod, percentage, skill, difficulty, matrix_value
        );
    }
}

#[test]
fn matches_calculate_odds_matrix_difficulty_zero() {
    // Test that difficulty=0 case matches matrix
    // When difficulty=0, any modifier is accepted, so result should be 100% - auto_fail_odds
    let tokens = vec![
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
    ];

    // Calculate full matrix
    let matrix = calculate_odds(&tokens, &[]).expect("calculate_odds should succeed");

    // Test multiple skill values with difficulty=0
    // All should return the same value (independent of skill when difficulty=0)
    for skill in [0, 5, 10, 50, 99] {
        let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, 0, 0);
        let total_prob: f64 = result.iter().map(|m| m.probability).sum();
        let percentage = (total_prob * 100.0).round() as u16;

        // Get corresponding value from matrix
        let matrix_value = matrix[skill as usize][0];

        assert_eq!(
            percentage, matrix_value,
            "mismatch for difficulty=0, skill={}: get_chaos_bag_item_modifiers returned {}%, matrix[{}][0] = {}%",
            skill, percentage, skill, matrix_value
        );
    }

    // Also verify that all skill values give the same result for difficulty=0
    let first_result = get_chaos_bag_item_modifiers(&tokens, 0, 0, 0, 0);
    let first_prob: f64 = first_result.iter().map(|m| m.probability).sum();
    let first_percentage = (first_prob * 100.0).round() as u16;

    for skill in [1, 10, 50, 99] {
        let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, 0, 0);
        let total_prob: f64 = result.iter().map(|m| m.probability).sum();
        let percentage = (total_prob * 100.0).round() as u16;

        assert_eq!(
            percentage, first_percentage,
            "difficulty=0 should give same result for all skill values: skill=0 gave {}%, skill={} gave {}%",
            first_percentage, skill, percentage
        );
    }
}

#[test]
fn matches_calculate_odds_matrix_multiple_combinations() {
    // Comprehensive test with multiple skill/difficulty combinations
    let tokens = vec![
        token("plusThree", 3),
        token("plusTwo", 2),
        token("plusOne", 1),
        token("zero", 0),
        token("minusOne", -1),
        token("minusTwo", -2),
    ];

    // Calculate full matrix
    let matrix = calculate_odds(&tokens, &[]).expect("calculate_odds should succeed");

    // Test a grid of skill/difficulty combinations
    let skill_values = vec![0, 1, 5, 10, 20, 50];
    let difficulty_values = vec![0, 1, 3, 5, 10, 20, 50];

    for &skill in &skill_values {
        for &difficulty in &difficulty_values {
            // Get result from get_chaos_bag_item_modifiers
            let result = get_chaos_bag_item_modifiers(&tokens, 0, skill, difficulty, 0);
            let total_prob: f64 = result.iter().map(|m| m.probability).sum();
            let percentage = (total_prob * 100.0).round() as u16;

            // Get corresponding value from matrix
            let matrix_value = matrix[skill as usize][difficulty as usize];

            assert_eq!(
                percentage, matrix_value,
                "mismatch for skill={}, difficulty={}: get_chaos_bag_item_modifiers returned {}%, matrix[{}][{}] = {}%",
                skill, difficulty, percentage, skill, difficulty, matrix_value
            );
        }
    }
}
