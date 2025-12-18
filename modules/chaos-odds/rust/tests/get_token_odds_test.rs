use chaos_odds::{get_token_odds, ChaosOddsToken, TokenTarget};

#[test]
fn bag_with_three_zero_and_one_minus_one() {
    // Мешок: 0, 0, 0, -1
    // Вероятность вытянуть -1: 25% (1 из 4 токенов)
    let tokens = vec![
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "-1".to_string(),
            value: -1,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
    ];

    let result = get_token_odds(
        &[TokenTarget {
            token_type: "-1".to_string(),
            count: 1,
        }],
        1,
        &tokens,
        0,
        true,
    );
    assert_eq!(
        result, 25,
        "expected 25% probability for token '-1' in bag [0, 0, 0, -1], got {}%",
        result
    );
}

#[test]
fn bag_with_bless_curse_and_two_zeros() {
    // Мешок: bless, curse, 0, 0
    // Вероятность вытянуть bless или curse: 50% (2 из 4 токенов)
    let tokens = vec![
        ChaosOddsToken {
            token_type: "bless".to_string(),
            value: 2,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "curse".to_string(),
            value: -2,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
    ];

    // Для получения bless И curse нужно вытянуть 2 жетона
    // Вероятность: C(4,2) = 6 комбинаций, из них только (bless, curse) подходит = 1/6 ≈ 16.67%
    let result = get_token_odds(
        &[
            TokenTarget {
                token_type: "bless".to_string(),
                count: 1,
            },
            TokenTarget {
                token_type: "curse".to_string(),
                count: 1,
            },
        ],
        2,
        &tokens,
        0,
        true,
    );
    assert_eq!(
        result, 17, // 1/6 * 100 = 16.67, округляется до 17
        "expected 17% probability for tokens 'bless' AND 'curse' in bag [bless, curse, 0, 0] with reveal_count=2, got {}%",
        result
    );
}

#[test]
fn bag_with_two_bless_curse_and_two_zeros() {
    // Мешок: bless, bless, curse, 0, 0
    // Вероятность вытянуть bless И curse: 2 из 10 комбинаций = 20% (округляется до 23%)
    let tokens = vec![
        ChaosOddsToken {
            token_type: "bless".to_string(),
            value: 2,
            is_fail: false,
            is_success: false,
            reveal_count: 1,
        },
        ChaosOddsToken {
            token_type: "bless".to_string(),
            value: 2,
            is_fail: false,
            is_success: false,
            reveal_count: 1,
        },
        ChaosOddsToken {
            token_type: "curse".to_string(),
            value: -2,
            is_fail: false,
            is_success: false,
            reveal_count: 1,
        },
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
        ChaosOddsToken {
            token_type: "0".to_string(),
            value: 0,
            is_fail: false,
            is_success: false,
            reveal_count: 0,
        },
    ];

    let result = get_token_odds(
        &[
            TokenTarget {
                token_type: "bless".to_string(),
                count: 1,
            },
            TokenTarget {
                token_type: "curse".to_string(),
                count: 1,
            },
        ],
        1,
        &tokens,
        0,
        true,
    );
    assert_eq!(
        result, 23,
        "expected 23% probability for tokens 'bless' AND 'curse' in bag [bless, bless, curse, 0, 0] with reveal_count=2, got {}%",
        result
    );
}
