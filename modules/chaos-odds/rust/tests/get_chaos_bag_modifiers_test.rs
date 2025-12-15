use chaos_odds::{get_chaos_bag_modifiers, ChaosOddsToken};

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
fn regular_tokens_probabilities() {
    // Bag: [+1, -1]
    let tokens = vec![token("1", 1), token("-1", -1)];

    let mut result = get_chaos_bag_modifiers(&tokens, 0);
    result.sort_by_key(|item| item.modifier);

    assert_eq!(result.len(), 2);

    let first = &result[0];
    assert_eq!(first.modifier, -1);
    assert!((first.probability - 0.5).abs() < 1e-9);

    let second = &result[1];
    assert_eq!(second.modifier, 1);
    assert!((second.probability - 0.5).abs() < 1e-9);
}

#[test]
fn three_regular_tokens_equal_probabilities() {
    let tokens = vec![token("-2", -2), token("-4", -4), token("-6", -6)];

    let mut result = get_chaos_bag_modifiers(&tokens, 0);
    result.sort_by_key(|item| item.modifier);

    assert_eq!(result.len(), 3);
    for entry in &result {
        assert!((entry.probability - (1.0 / 3.0)).abs() < 1e-9);
    }
}

#[test]
fn modifier_zero_with_reveal_token() {
    // Bag: -2 (regular), bless (reveal 1, value 2), 0 (regular)
    let tokens = vec![
        token("-2", -2),
        token_with_reveal("bless", 2, 1),
        token("0", 0),
    ];

    let result = get_chaos_bag_modifiers(&tokens, 0);
    let total_zero_prob: f64 = result
        .iter()
        .filter(|entry| entry.modifier == 0)
        .map(|entry| entry.probability)
        .sum();

    assert!((total_zero_prob - 0.5).abs() < 1e-9);
}

#[test]
fn minus_two_probability_with_reveal_token_present() {
    // Bag: 0, bless(reveal 1), -6, -2
    let tokens = vec![
        token("0", 0),
        token_with_reveal("bless", 2, 1),
        token("-6", -6),
        token("-2", -2),
    ];

    let result = get_chaos_bag_modifiers(&tokens, 0);
    let total_minus_two: f64 = result
        .iter()
        .filter(|entry| entry.modifier == -2)
        .map(|entry| entry.probability)
        .sum();

    // Only direct draw of -2 from 4 tokens
    assert!((total_minus_two - 0.25).abs() < 1e-9);
}

#[test]
fn minus_four_probability_two_curse_reveals() {
    // Bag: curse(reveal1), curse(reveal1), 0, bless(reveal1)
    let tokens = vec![
        token_with_reveal("curse", -2, 1),
        token_with_reveal("curse", -2, 1),
        token("0", 0),
        token_with_reveal("bless", 2, 1),
    ];

    let result = get_chaos_bag_modifiers(&tokens, 0);
    let total_minus_four: f64 = result
        .iter()
        .filter(|entry| entry.modifier == -4)
        .map(|entry| entry.probability)
        .sum();

    let expected = (2.0 / 4.0) * (1.0 / 3.0); // draw curse then curse
    assert!((total_minus_four - expected).abs() < 1e-9);
}

#[test]
fn unique_modifiers_with_tablet_and_reveals() {
    // Tablet revealCount=2 plus assorted tokens
    let tokens = vec![
        token_with_reveal("tablet", 0, 2),
        token("0", 0),
        token("0", 0),
        token("-2", -2),
        token("-4", -4),
        token("-4", -4),
        token_with_reveal("bless", 2, 1),
        token_with_reveal("curse", -2, 1),
        token("-6", -6),
    ];

    let result = get_chaos_bag_modifiers(&tokens, 0);
    let mut mods: Vec<i16> = result.iter().map(|e| e.modifier).collect();
    mods.sort_unstable();
    mods.dedup();

    assert_eq!(mods, vec![-12, -10, -8, -6, -4, -2, 0, 2]);
}

#[test]
fn entry_count_under_5000() {
    let mut tokens: Vec<ChaosOddsToken> = Vec::new();

    for _ in 0..10 {
        tokens.push(token_with_reveal("bless", 2, 1));
    }
    for _ in 0..10 {
        tokens.push(token_with_reveal("curse", -2, 1));
    }
    for _ in 0..3 {
        tokens.push(token("-4", -4));
    }

    let result = get_chaos_bag_modifiers(&tokens, 0);
    assert!(result.len() < 5000);
}

#[test]
fn entry_count_under_50000_large_bag() {
    let mut tokens: Vec<ChaosOddsToken> = Vec::new();

    for _ in 0..3 {
        tokens.push(token_with_reveal("bless", 2, 1));
    }
    for _ in 0..3 {
        tokens.push(token_with_reveal("curse", -2, 1));
    }
    for _ in 0..2 {
        tokens.push(token_with_reveal("frost", -1, 1));
    }

    let regular = [
        ("+1", 1, 2),
        ("0", 0, 2),
        ("-1", -1, 2),
        ("-3", -3, 2),
        ("-4", -4, 2),
        ("-6", -6, 2),
        ("-8", -8, 2),
    ];
    for (typ, val, count) in regular {
        for _ in 0..count {
            tokens.push(token(typ, val));
        }
    }

    let result = get_chaos_bag_modifiers(&tokens, 0);
    println!("entry count: {}", result.len());
    assert!(
        result.len() < 50_000,
        "expected < 50_000 entries, got {}",
        result.len()
    );
}
