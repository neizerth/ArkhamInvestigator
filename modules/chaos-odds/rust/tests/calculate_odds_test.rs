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

    let result = calculate_odds(&available, &revealed);

    assert!(
        (result[0][0] - 0.5).abs() < 1e-9,
        "expected 0.5 probability at [0][0], got {}",
        result[0][0]
    );
}
