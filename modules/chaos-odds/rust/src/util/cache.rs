use std::collections::HashMap;

pub fn build_cache_key(
    reveal_map: &HashMap<String, usize>,
    available_count: usize,
    modifier: i16,
) -> String {
    let mut entries: Vec<(String, usize)> =
        reveal_map.iter().map(|(k, v)| (k.clone(), *v)).collect();
    entries.sort_by(|a, b| a.0.cmp(&b.0));

    let parts: Vec<String> = entries
        .iter()
        .map(|(k, v)| format!("{}:{}", k, v))
        .collect();

    format!("{}|{}|{}", parts.join(","), available_count, modifier)
}

