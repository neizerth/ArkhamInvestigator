use rustc_hash::FxHashMap;

use crate::types::{ChaosOddsGroup, ChaosOddsToken, Counts};

pub fn build_groups(tokens: &[ChaosOddsToken]) -> Vec<ChaosOddsGroup> {
    let mut grouped: FxHashMap<String, ChaosOddsGroup> = FxHashMap::default();

    for token in tokens.iter().cloned() {
        let is_frost = token.token_type == "frost";
        let key = format!(
            "{}-{}-{}-{}-{}",
            is_frost, token.reveal_count, token.value, token.is_fail, token.is_success,
        );

        if let Some(group) = grouped.get_mut(&key) {
            group.count += 1;
        } else {
            // Precompute modifier - preserve sentinel values (AUTO_FAIL, AUTO_SUCCESS)
            let modifier = token.as_modifier();

            grouped.insert(
                key,
                ChaosOddsGroup {
                    token,
                    is_frost,
                    count: 1,
                    modifier,
                },
            );
        }
    }

    grouped.into_iter().map(|(_, group)| group).collect()
}

pub fn groups_to_available_map(groups: &[ChaosOddsGroup]) -> Counts {
    if groups.is_empty() {
        return Counts::new();
    }

    let mut map = Counts::with_capacity(groups.len());
    map.resize(groups.len(), 0);

    for (idx, group) in groups.iter().enumerate() {
        // Use saturating cast to handle counts > 255 safely
        map[idx] = group.count.min(255) as u8;
    }

    map
}
