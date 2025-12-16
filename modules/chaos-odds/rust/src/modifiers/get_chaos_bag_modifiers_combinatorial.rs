use rustc_hash::FxHashMap;

use crate::types::{ChaosOddsCacheItem, ChaosOddsGroup, ChaosOddsToken};
use crate::util::groups::build_groups;

/// Главная функция — комбинаторная версия
pub fn get_chaos_bag_modifiers_combinatorial(
    tokens: &[ChaosOddsToken],
    revealed_frost_count: usize,
) -> Vec<ChaosOddsCacheItem> {
    if tokens.is_empty() {
        return Vec::new();
    }

    let groups = build_groups(tokens);
    let _group_len = groups.len();

    let total_tokens: usize = groups.iter().map(|g| g.count).sum();

    // available counts
    let mut available = [0u8; 32];
    for (i, g) in groups.iter().enumerate() {
        available[i] = g.count as u8;
    }

    // результат: (modifier, packed_reveal) -> probability
    let mut result: FxHashMap<(i16, u128), f64> = FxHashMap::default();

    // ============================
    // 1. Обычные токены (без reveal)
    // ============================
    for g in &groups {
        if g.token.reveal_count != 0 {
            continue;
        }

        let p = g.count as f64 / total_tokens as f64;
        let modifier = g.modifier as i16;

        result
            .entry((modifier, 0))
            .and_modify(|v| *v += p)
            .or_insert(p);
    }

    // ============================
    // 2. Reveal токены
    // ============================
    // Глобальная дедупликация для всех reveal-цепей
    let mut global_visited: FxHashMap<(u128, usize), f64> = FxHashMap::default();

    for (start_idx, g) in groups.iter().enumerate() {
        if g.token.reveal_count == 0 || g.token.is_fail {
            continue;
        }

        // Frost restriction
        if g.token.token_type == "frost" && revealed_frost_count == 1 {
            continue;
        }

        let start_prob = g.count as f64 / total_tokens as f64;

        let mut drawn = [0u8; 32];
        drawn[start_idx] = 1;

        enumerate_reveals(
            &groups,
            &available,
            &mut drawn,
            g.token.reveal_count,
            start_prob,
            g.modifier as i16,
            &mut result,
            revealed_frost_count,
            &mut global_visited,
        );
    }

    // ============================
    // 3. В ChaosOddsCacheItem
    // ============================
    result
        .into_iter()
        .map(|((modifier, reveal), probability)| ChaosOddsCacheItem {
            modifier,
            probability,
            reveal,
            available_mask: 0,
            available_counts: [0; 32],
            available_count: 0,
            pending_reveal: 0,
        })
        .collect()
}

/// Рекурсивный перебор количеств вытянутых токенов (НЕ порядков!)
/// Использует дедупликацию для предотвращения бесконечных циклов
fn enumerate_reveals(
    groups: &[ChaosOddsGroup],
    available: &[u8; 32],
    drawn: &mut [u8; 32],
    pending_reveal: usize,
    base_prob: f64,
    base_modifier: i16,
    out: &mut FxHashMap<(i16, u128), f64>,
    revealed_frost_count: usize,
    visited: &mut FxHashMap<(u128, usize), f64>, // (packed_drawn, pending_reveal) -> probability (for dedup only)
) {
    // Если reveal больше нет — считаем финальную вероятность
    if pending_reveal == 0 {
        finalize_state(groups, available, drawn, base_prob, base_modifier, out);
        return;
    }

    // Pack current drawn state for deduplication
    let mut packed_drawn = 0u128;
    for (i, &cnt) in drawn.iter().enumerate() {
        if cnt > 0 {
            packed_drawn |= (cnt as u128) << (i * 4);
        }
    }

    // Дедупликация: если это состояние уже обрабатывалось, просто возвращаемся
    // (вероятность уже учтена при первом проходе)
    let state_key = (packed_drawn, pending_reveal);
    if visited.contains_key(&state_key) {
        return; // Уже обрабатывали это состояние
    }
    visited.insert(state_key, base_prob);

    let group_len = groups.len();

    // Calculate remaining tokens
    let total_drawn: usize = drawn.iter().sum::<u8>() as usize;
    let total_available: usize = available.iter().sum::<u8>() as usize;
    let remaining = total_available.saturating_sub(total_drawn);

    if remaining == 0 {
        return; // No tokens left
    }

    // Ограничение на максимальное количество вытянутых токенов (предотвращение бесконечных циклов)
    const MAX_DRAWN: usize = 50; // Разумный лимит
    if total_drawn >= MAX_DRAWN {
        return;
    }

    for i in 0..group_len {
        let g = &groups[i];

        if g.token.is_fail {
            continue;
        }

        if g.token.token_type == "frost" && revealed_frost_count == 1 {
            continue;
        }

        let used = drawn[i];
        let avail = available[i];

        if used >= avail {
            continue;
        }

        // Probability of drawing this specific token
        let token_prob = (avail - used) as f64 / remaining as f64;
        let next_prob = base_prob * token_prob;

        // взять ещё один токен группы i
        drawn[i] += 1;

        enumerate_reveals(
            groups,
            available,
            drawn,
            pending_reveal - 1 + g.token.reveal_count,
            next_prob,
            base_modifier + (g.modifier as i16),
            out,
            revealed_frost_count,
            visited,
        );

        drawn[i] -= 1;
    }
}

/// Финализация одного мультимножества
fn finalize_state(
    groups: &[ChaosOddsGroup],
    available: &[u8; 32],
    drawn: &[u8; 32],
    base_prob: f64,
    base_modifier: i16,
    out: &mut FxHashMap<(i16, u128), f64>,
) {
    let mut total_drawn = 0usize;
    let mut modifier = base_modifier;

    for (i, &cnt) in drawn.iter().enumerate() {
        if cnt == 0 {
            continue;
        }

        total_drawn += cnt as usize;
        modifier += (cnt as i16) * groups[i].modifier as i16;
    }

    if total_drawn == 0 {
        return;
    }

    // Probability is already calculated during enumeration (base_prob)
    // We just need to use it directly
    let prob = base_prob;

    // упаковываем reveal
    let mut packed = 0u128;
    for (i, &cnt) in drawn.iter().enumerate() {
        packed |= (cnt as u128) << (i * 4);
    }

    out.entry((modifier, packed))
        .and_modify(|v| *v += prob)
        .or_insert(prob);
}
