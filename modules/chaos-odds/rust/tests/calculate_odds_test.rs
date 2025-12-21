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
        calculate_odds(&available, &revealed, false).expect("Calculation should not be cancelled");

    // Result is now in percentages (0-100), so 0.5 probability = 50%
    assert_eq!(
        result[0][0], 50,
        "expected 50% probability at [0][0], got {}%",
        result[0][0]
    );
}
