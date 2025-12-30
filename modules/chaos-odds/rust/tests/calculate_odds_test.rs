use chaos_odds::{calculate_odds, ChaosOddsToken};

#[test]
fn zero_difficulty_with_autofail_and_plus_one_is_half() {
    let available = vec![
        ChaosOddsToken {
            token_type: "autoFail".into(),
            value: 0,
            is_fail: true,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "plusOne".into(),
            value: 1,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
    ];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result =
        calculate_odds(&available, &revealed).expect("Calculation should not be cancelled");

    // Result is now in percentages (0-100), so 0.5 probability = 50%
    assert_eq!(
        result[0][0], 50,
        "expected 50% probability at [0][0], got {}%",
        result[0][0]
    );
}

#[test]
fn single_bless_token_zero_difficulty_zero_skill() {
    // Bag: bless x1 (value=+2, reveal_count=1)
    // At difficulty=0, skill=0: should be 100% success
    let available = vec![ChaosOddsToken {
        token_type: "bless".into(),
        value: 2,
        is_fail: false,
        is_success: false,
        reveal_count: 1,
    }];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result =
        calculate_odds(&available, &revealed).expect("Calculation should not be cancelled");

    assert_eq!(
        result[0][0], 100,
        "expected 100% probability at skill=0, difficulty=0 for single bless token, got {}%",
        result[0][0]
    );
}

#[test]
fn two_bless_tokens_difficulty_one_zero_skill() {
    // Bag: bless x2 (value=+2, reveal_count=1)
    // At difficulty=1, skill=0: should be 100% success
    let available = vec![
        ChaosOddsToken {
            token_type: "bless".into(),
            value: 2,
            is_fail: false,
            is_success: false,
            reveal_count: 1,
        },
        ChaosOddsToken {
            token_type: "bless".into(),
            value: 2,
            is_fail: false,
            is_success: false,
            reveal_count: 1,
        },
    ];

    let revealed: Vec<ChaosOddsToken> = Vec::new();

    let result =
        calculate_odds(&available, &revealed).expect("Calculation should not be cancelled");

    assert_eq!(
        result[0][1], 100,
        "expected 100% probability at skill=0, difficulty=1 for two bless tokens, got {}%",
        result[0][1]
    );
}
