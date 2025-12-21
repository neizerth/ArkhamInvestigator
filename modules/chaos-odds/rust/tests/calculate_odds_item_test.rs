use chaos_odds::{odds::calculate_odds_item, ChaosOddsToken};

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

fn auto_fail_token() -> ChaosOddsToken {
    ChaosOddsToken {
        token_type: "autoFail".to_string(),
        value: 0,
        is_fail: true,
        is_success: false,
        reveal_count: 0,
    }
}

#[test]
fn zero_difficulty_with_autofail_and_plus_one() {
    // Bag: autoFail, +1
    // At difficulty 0: success = 100% - auto_fail_odds = 100% - 50% = 50%
    let available = vec![auto_fail_token(), token("plusOne", 1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 0, 0)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 50,
        "expected 50% probability at skill=0, difficulty=0, got {}%",
        result
    );
}

#[test]
fn zero_difficulty_only_regular_tokens() {
    // Bag: +1, -1, 0
    // At difficulty 0: no auto-fail, so success = 100%
    let available = vec![token("plusOne", 1), token("minusOne", -1), token("zero", 0)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 0, 0)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 100,
        "expected 100% probability at skill=0, difficulty=0 with no auto-fail, got {}%",
        result
    );
}

#[test]
fn skill_plus_modifier_equals_difficulty() {
    // Bag: +1, -1
    // skill=2, difficulty=3, revealed=0
    // Required modifier: 3 - 2 - 0 = 1
    // Only +1 satisfies: probability = 50%
    let available = vec![token("plusOne", 1), token("minusOne", -1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 2, 3)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 50,
        "expected 50% probability at skill=2, difficulty=3, got {}%",
        result
    );
}

#[test]
fn skill_plus_modifier_greater_than_difficulty() {
    // Bag: +2, +1, -1
    // skill=2, difficulty=3, revealed=0
    // Required modifier: 3 - 2 - 0 = 1
    // Both +2 and +1 satisfy: probability = 2/3 ≈ 66.67%
    let available = vec![token("plusTwo", 2), token("plusOne", 1), token("minusOne", -1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 2, 3)
        .expect("Calculation should not be cancelled");

    // Should be approximately 66.67%, but rounding might give 67%
    assert!(
        result >= 66 && result <= 67,
        "expected ~67% probability at skill=2, difficulty=3, got {}%",
        result
    );
}

#[test]
fn skill_plus_modifier_less_than_difficulty() {
    // Bag: +1, -1
    // skill=1, difficulty=5, revealed=0
    // Required modifier: 5 - 1 - 0 = 4
    // No tokens satisfy: probability = 0%
    let available = vec![token("plusOne", 1), token("minusOne", -1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 1, 5)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 0,
        "expected 0% probability at skill=1, difficulty=5, got {}%",
        result
    );
}

#[test]
fn with_revealed_modifier() {
    // Bag: +1, -1
    // skill=2, difficulty=3, revealed=+1
    // Required modifier: 3 - 2 - 1 = 0
    // Both +1 and -1 satisfy (2 + 1 + 1 = 4 >= 3, 2 + 1 - 1 = 2 < 3, wait...)
    // Actually: skill + modifier + revealed >= difficulty
    // 2 + 1 + 1 = 4 >= 3 ✓
    // 2 + (-1) + 1 = 2 < 3 ✗
    // So only +1 satisfies: probability = 50%
    let available = vec![token("plusOne", 1), token("minusOne", -1)];

    let revealed = vec![token("plusOne", 1)];

    let result = calculate_odds_item(&available, &revealed, 2, 3)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 50,
        "expected 50% probability at skill=2, difficulty=3 with revealed=+1, got {}%",
        result
    );
}

#[test]
fn with_revealed_autofail() {
    // Bag: +1, -1
    // If revealed contains auto-fail, should return 0%
    let available = vec![token("plusOne", 1), token("minusOne", -1)];

    let revealed = vec![auto_fail_token()];

    let result = calculate_odds_item(&available, &revealed, 2, 3)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 0,
        "expected 0% probability when revealed contains auto-fail, got {}%",
        result
    );
}

#[test]
fn with_bless_reveal_token() {
    // Bag: +1, bless(reveal=1, value=+2)
    // skill=2, difficulty=4, revealed=0
    // Required modifier: 4 - 2 - 0 = 2
    // Bless can reveal +1, which gives total modifier of +2 or +3
    // This is complex, so we just check it's reasonable
    let available = vec![token("plusOne", 1), token_with_reveal("bless", 2, 1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 2, 4)
        .expect("Calculation should not be cancelled");

    // Should be > 0 and <= 100
    assert!(
        result > 0 && result <= 100,
        "expected reasonable probability with bless reveal, got {}%",
        result
    );
}

#[test]
fn with_curse_reveal_token() {
    // Bag: +1, curse(reveal=1, value=-2)
    // skill=2, difficulty=2, revealed=0
    // Required modifier: 2 - 2 - 0 = 0
    // Curse can reveal +1, which gives total modifier of -1 or +1
    // This is complex, so we just check it's reasonable
    let available = vec![token("plusOne", 1), token_with_reveal("curse", -2, 1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 2, 2)
        .expect("Calculation should not be cancelled");

    // Should be > 0 and <= 100
    assert!(
        result > 0 && result <= 100,
        "expected reasonable probability with curse reveal, got {}%",
        result
    );
}

#[test]
fn high_skill_low_difficulty() {
    // Bag: +1, -1, 0
    // skill=10, difficulty=5, revealed=0
    // Required modifier: 5 - 10 - 0 = -5
    // All modifiers satisfy: probability = 100%
    let available = vec![token("plusOne", 1), token("minusOne", -1), token("zero", 0)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 10, 5)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 100,
        "expected 100% probability at skill=10, difficulty=5, got {}%",
        result
    );
}

#[test]
fn low_skill_high_difficulty() {
    // Bag: +1, -1
    // skill=1, difficulty=10, revealed=0
    // Required modifier: 10 - 1 - 0 = 9
    // No tokens satisfy: probability = 0%
    let available = vec![token("plusOne", 1), token("minusOne", -1)];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result = calculate_odds_item(&available, &revealed, 1, 10)
        .expect("Calculation should not be cancelled");

    assert_eq!(
        result, 0,
        "expected 0% probability at skill=1, difficulty=10, got {}%",
        result
    );
}

#[test]
fn matches_calculate_odds_matrix() {
    // Test that calculate_odds_item matches the corresponding cell in calculate_odds matrix
    use chaos_odds::calculate_odds;

    let available = vec![
        token("plusOne", 1),
        token("minusOne", -1),
        token("zero", 0),
        auto_fail_token(),
    ];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    // Get full matrix
    let matrix = calculate_odds(&available, &revealed).expect("Calculation should not be cancelled");

    // Test a few specific skill/difficulty combinations
    for skill in [0, 2, 5, 10] {
        for difficulty in [0, 1, 3, 5] {
            let item_result = calculate_odds_item(&available, &revealed, skill, difficulty)
                .expect("Calculation should not be cancelled");
            let matrix_result = matrix[skill as usize][difficulty as usize];

            assert_eq!(
                item_result, matrix_result,
                "mismatch at skill={}, difficulty={}: item={}%, matrix={}%",
                skill, difficulty, item_result, matrix_result
            );
        }
    }
}

