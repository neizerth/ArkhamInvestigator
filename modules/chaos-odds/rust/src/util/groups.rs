use std::collections::HashMap;

use crate::types::{ChaosOddsGroup, ChaosOddsToken};

pub fn build_groups(tokens: &[ChaosOddsToken]) -> Vec<ChaosOddsGroup> {
    let mut grouped: HashMap<String, ChaosOddsGroup> = HashMap::new();

    for token in tokens.iter().cloned() {
        let key = format!(
            "{}-{}-{}-{}-{}",
            token.token_type, token.reveal_count, token.value, token.is_fail, token.is_success,
        );

        if let Some(group) = grouped.get_mut(&key) {
            group.count += 1;
        } else {
            let index = grouped.len();
            grouped.insert(
                key,
                ChaosOddsGroup {
                    group_index: format!("{:x}", index),
                    token,
                    count: 1,
                },
            );
        }
    }

    grouped.into_iter().map(|(_, group)| group).collect()
}

pub fn groups_to_available_map(groups: &[ChaosOddsGroup]) -> HashMap<String, usize> {
    let mut map = HashMap::new();
    for group in groups {
        map.insert(group.group_index.clone(), group.count);
    }
    map
}
