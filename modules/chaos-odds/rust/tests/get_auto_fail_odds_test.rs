use chaos_odds::{get_auto_fail_odds, ChaosOddsToken};

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
fn empty_bag_returns_zero() {
    let tokens: Vec<ChaosOddsToken> = Vec::new();
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(result, 0, "empty bag should return 0%");
}

#[test]
fn zero_and_autofail_returns_fifty() {
    // Bag: 0, autoFail
    // Expected auto-fail probability: 50%
    let tokens = vec![token("0", 0), auto_fail_token()];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 50,
        "expected 50% auto-fail probability for bag [0, autoFail], got {}%",
        result
    );
}

#[test]
fn three_regular_and_one_autofail() {
    // Bag: regular x3, autofail x1
    // Expected auto-fail probability: 25%
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        auto_fail_token(),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 25,
        "expected 25% auto-fail probability for bag [regular x3, autofail x1], got {}%",
        result
    );
}

#[test]
fn only_regular_tokens_returns_zero() {
    // Bag: regular x3
    // Expected auto-fail probability: 0%
    let tokens = vec![token("0", 0), token("0", 0), token("0", 0)];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 0,
        "expected 0% auto-fail probability for bag [regular x3], got {}%",
        result
    );
}

#[test]
fn only_autofail_returns_hundred() {
    // Bag: autofail x1
    // Expected auto-fail probability: 100%
    let tokens = vec![auto_fail_token()];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 100,
        "expected 100% auto-fail probability for bag [autofail x1], got {}%",
        result
    );
}

#[test]
fn frost_single_no_autofail() {
    // Bag: regular x5, frost x1 (reveal_count=1)
    // With only 1 frost, drawing it won't cause auto-fail (need 2+ frost in chain)
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token_with_reveal("frost", 0, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 0,
        "expected 0% auto-fail probability for bag [regular x5, frost x1], got {}%",
        result
    );
}

#[test]
fn frost_two_causes_autofail() {
    // Bag: regular x4, frost x2 (reveal_count=1)
    // When frost is drawn, it reveals another token. If that token is also frost,
    // then frost_count becomes 2, causing auto-fail.
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token_with_reveal("frost", 0, 1),
        token_with_reveal("frost", 0, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Probability of frost -> frost chain: (2/6) * (1/5) = 2/30 = 1/15 ≈ 6.67%
    // But we need to account for both orders: frost1 -> frost2 and frost2 -> frost1
    // Actually, it's simpler: probability of drawing frost first is 2/6, then drawing another frost is 1/5
    // So total is (2/6) * (1/5) = 2/30 = 1/15 ≈ 6.67%
    assert!(
        result > 0 && result < 10,
        "expected > 0% and < 10% auto-fail probability for bag [regular x4, frost x2], got {}%",
        result
    );
}

#[test]
fn frost_with_revealed_frost_one() {
    // Bag: regular x4, frost x1 (reveal_count=1)
    // Already revealed 1 frost, so drawing another frost will cause auto-fail
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token_with_reveal("frost", 0, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 1); // revealed_frost_count = 1
                                                 // If we draw frost, revealed_frost_count becomes 1 + 1 = 2, causing auto-fail
                                                 // Probability: 1/5 = 20%
    assert_eq!(
        result, 20,
        "expected 20% auto-fail probability for bag [regular x4, frost x1] with revealed_frost_count=1, got {}%",
        result
    );
}

#[test]
fn frost_with_revealed_frost_two() {
    // Bag: regular x4, frost x1 (reveal_count=1)
    // Already revealed 2 frost, so any draw will cause auto-fail (but we only count frost draws)
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token_with_reveal("frost", 0, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 2); // revealed_frost_count = 2
                                                 // If we draw frost, revealed_frost_count becomes 2 + 1 = 3, causing auto-fail
                                                 // Probability: 1/5 = 20%
    assert_eq!(
        result, 20,
        "expected 20% auto-fail probability for bag [regular x4, frost x1] with revealed_frost_count=2, got {}%",
        result
    );
}

#[test]
fn autofail_and_bless_chain() {
    // Bag: regular x3, autofail x1, bless x1 (reveal_count=1)
    // Auto-fail can occur from:
    // 1. Direct autofail draw: 1/5 = 20%
    // 2. Bless -> autofail chain: (1/5) * (1/4) = 5%
    // Total: 25%
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        auto_fail_token(),
        token_with_reveal("bless", 2, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Direct autofail: 1/5 = 20%
    // Bless -> autofail: (1/5) * (1/4) = 5%
    // Total: 25%
    assert_eq!(
        result, 25,
        "expected 25% auto-fail probability for bag [regular x3, autofail x1, bless x1], got {}%",
        result
    );
}

#[test]
fn frost_reveal_count_two() {
    // Bag: regular x3, frost x1 (reveal_count=2)
    // If we draw frost, revealed_frost_count becomes 0 + 2 = 2, causing auto-fail
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        token_with_reveal("frost", 0, 2),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Probability: 1/4 = 25%
    assert_eq!(
        result, 25,
        "expected 25% auto-fail probability for bag [regular x3, frost x1 (reveal_count=2)], got {}%",
        result
    );
}

#[test]
fn complex_mixed_tokens() {
    // Bag: regular x2, autofail x1, frost x2 (reveal_count=1), bless x1 (reveal_count=1)
    // Complex chain with multiple reveal tokens
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        auto_fail_token(),
        token_with_reveal("frost", 0, 1),
        token_with_reveal("frost", 0, 1),
        token_with_reveal("bless", 2, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Should be > 0 and reasonable
    assert!(
        result > 0 && result <= 100,
        "expected > 0% and <= 100% auto-fail probability for complex bag, got {}%",
        result
    );
}
#[test]
fn bless_chain_multiple() {
    // Bag: regular x2, bless x2 (reveal_count=1)
    // Each bless reveals another token. Probability of auto-fail: 0% because no autofail or frost.
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token_with_reveal("bless", 0, 1),
        token_with_reveal("bless", 0, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 0,
        "expected 0% auto-fail for multiple bless tokens without fails"
    );
}

#[test]
fn curse_token_direct_autofail() {
    // Bag: regular x3, curse x1 (simulate curse as auto-fail)
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token("0", 0),
        auto_fail_token(), // curse
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    assert_eq!(
        result, 25,
        "expected 25% auto-fail probability due to curse/autofail"
    );
}

#[test]
fn frost_and_bless_chain() {
    // Bag: regular x2, frost x1 (reveal_count=1), bless x1 (reveal_count=1)
    // If bless reveals frost: frost_count=1 -> no auto-fail yet
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token_with_reveal("frost", 0, 1),
        token_with_reveal("bless", 0, 1),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Probability should be small but > 0
    assert!(
        result == 0,
        "expected 0% auto-fail probability for frost+bless chain, got {}%",
        result
    );
}

#[test]
fn multiple_frosts_and_blesses() {
    // Bag: frost x2 (reveal_count=1), bless x2 (reveal_count=1), regular x2
    // Multiple reveal chains can trigger auto-fail
    let tokens = vec![
        token_with_reveal("frost", 0, 1),
        token_with_reveal("frost", 0, 1),
        token_with_reveal("bless", 0, 1),
        token_with_reveal("bless", 0, 1),
        token("0", 0),
        token("0", 0),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Should be > 0 but < 100
    assert!(
        result > 0 && result < 100,
        "expected partial auto-fail probability for multiple frost+bless, got {}",
        result
    );
}

#[test]
fn revealed_frost_high() {
    // Bag: frost x1 (reveal_count=1), revealed_frost_count=3
    // Any frost draw triggers auto-fail
    let tokens = vec![token_with_reveal("frost", 0, 1)];
    let result = get_auto_fail_odds(&tokens, 3);
    assert_eq!(
        result, 100,
        "expected 100% auto-fail when revealed_frost_count >= 2 and frost present"
    );
}

#[test]
fn bless_reveal_autofail_chain() {
    // Bag: regular x2, bless x1 (reveal_count=1), autofail x1
    // Bless can reveal autofail
    let tokens = vec![
        token("0", 0),
        token("0", 0),
        token_with_reveal("bless", 0, 1),
        auto_fail_token(),
    ];
    let result = get_auto_fail_odds(&tokens, 0);
    // Auto-fail probability should account for both direct and via bless
    assert!(
        result > 0 && result <= 100,
        "expected auto-fail >0% due to bless revealing autofail, got {}",
        result
    );
}
