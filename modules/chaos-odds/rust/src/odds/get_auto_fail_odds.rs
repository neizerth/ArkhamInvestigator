use crate::types::ChaosOddsToken;

/// Calculate the probability of auto-fail when drawing one token from the bag
/// Returns probability as a percentage (0-100)
///
/// # Arguments
/// * `tokens` - List of available tokens in the chaos bag
/// * `revealed_frost_count` - Number of frost tokens already revealed
pub fn get_auto_fail_odds(tokens: &[ChaosOddsToken], revealed_frost_count: usize) -> u16 {
    if tokens.is_empty() {
        return 0;
    }

    // Use DFS to calculate probability of auto-fail
    // Auto-fail occurs when:
    // 1. We draw an autoFail token (token_type == "autoFail" or is_fail == true)
    // 2. We draw a frost token that causes revealed_frost_count to reach >= 2
    // 3. We draw a token that reveals another token that causes auto-fail (chain)

    let mut auto_fail_prob = 0.0;

    // Group tokens by type for efficient processing
    let mut groups: Vec<(String, usize, bool, bool, usize)> = Vec::new(); // (type, count, is_fail, is_frost, reveal_count)

    for token in tokens {
        let is_frost = token.token_type == "frost";
        let is_fail = token.token_type == "autoFail" || token.is_fail;

        if let Some(group) = groups.iter_mut().find(|g| g.0 == token.token_type) {
            group.1 += 1;
        } else {
            groups.push((
                token.token_type.clone(),
                1,
                is_fail,
                is_frost,
                token.reveal_count,
            ));
        }
    }

    // Calculate probability using recursive DFS
    fn dfs(
        groups: &[(String, usize, bool, bool, usize)],
        remaining: Vec<usize>,
        revealed_frost: usize,
        probability: f64,
        auto_fail_prob: &mut f64,
    ) {
        if remaining.is_empty() {
            return;
        }

        let total_remaining: usize = remaining.iter().sum();
        if total_remaining == 0 {
            return;
        }

        for (group_idx, &count) in remaining.iter().enumerate() {
            if count == 0 {
                continue;
            }

            let (_, _, is_fail, is_frost, reveal_count) = groups[group_idx];
            let p = probability * (count as f64) / (total_remaining as f64);

            // Check if this token causes auto-fail
            if is_fail {
                // Direct auto-fail
                *auto_fail_prob += p;
                continue;
            }

            if is_frost {
                let new_revealed_frost = revealed_frost + reveal_count;
                if new_revealed_frost >= 2 {
                    // Frost auto-fail
                    *auto_fail_prob += p;
                    continue;
                }

                // Frost token reveals another token
                if reveal_count > 0 {
                    // Continue DFS with revealed token
                    let mut next_remaining = remaining.clone();
                    next_remaining[group_idx] -= 1;
                    let total_next: usize = next_remaining.iter().sum();
                    // If bag is empty after drawing this token but it requires revealing another token, it's auto-fail
                    if total_next == 0 {
                        *auto_fail_prob += p;
                    } else {
                        dfs(
                            groups,
                            next_remaining,
                            new_revealed_frost,
                            p,
                            auto_fail_prob,
                        );
                    }
                } else {
                    // No reveal, just continue
                    let mut next_remaining = remaining.clone();
                    next_remaining[group_idx] -= 1;
                    dfs(
                        groups,
                        next_remaining,
                        new_revealed_frost,
                        p,
                        auto_fail_prob,
                    );
                }
            } else if reveal_count > 0 {
                // Non-frost token that reveals another token (e.g., bless)
                let mut next_remaining = remaining.clone();
                next_remaining[group_idx] -= 1;
                let total_next: usize = next_remaining.iter().sum();
                // If bag is empty after drawing this token but it requires revealing another token, it's auto-fail
                if total_next == 0 {
                    *auto_fail_prob += p;
                } else {
                    dfs(groups, next_remaining, revealed_frost, p, auto_fail_prob);
                }
            } else {
                // Regular token, no auto-fail
                // Continue DFS but don't add to auto_fail_prob
            }
        }
    }

    let remaining: Vec<usize> = groups.iter().map(|g| g.1).collect();
    dfs(
        &groups,
        remaining,
        revealed_frost_count,
        1.0,
        &mut auto_fail_prob,
    );

    // Convert to percentage and round
    ((auto_fail_prob * 100.0).round() as u16).min(100)
}
