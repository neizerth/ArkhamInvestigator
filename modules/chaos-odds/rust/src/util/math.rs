use dashmap::DashMap;
use smallvec::SmallVec;

// Cache key uses SmallVec to reduce allocations and keep on stack for small sizes
type CacheKey = SmallVec<[usize; 16]>;

lazy_static::lazy_static! {
    static ref MULTINOMIAL_CACHE: DashMap<CacheKey, u64> = DashMap::new();
}

// Precomputed log-factorials for small n to avoid repeated ln calls
const MAX_PRECOMPUTED: usize = 50;
lazy_static::lazy_static! {
    static ref LOG_FACTORIALS: Vec<f64> = {
        let mut logs = Vec::with_capacity(MAX_PRECOMPUTED + 1);
        logs.push(0.0);
        let mut sum = 0.0;
        for i in 1..=MAX_PRECOMPUTED {
            sum += (i as f64).ln();
            logs.push(sum);
        }
        logs
    };
}

#[inline]
fn log_factorial(n: usize) -> f64 {
    if n <= MAX_PRECOMPUTED {
        LOG_FACTORIALS[n]
    } else {
        let mut result = 0.0;
        for i in 1..=n {
            result += (i as f64).ln();
        }
        result
    }
}

/// Compute multinomial coefficient using logarithms to avoid overflow.
/// multinomial(n; k1, k2, ...) = n! / (k1! * k2! * ...)
pub fn multinomial(counts: &[usize]) -> u64 {
    // Sort counts for cache key consistency
    let mut sorted_counts: CacheKey = counts.iter().copied().collect();
    sorted_counts.sort_unstable();

    if let Some(cached) = MULTINOMIAL_CACHE.get(&sorted_counts) {
        return *cached;
    }

    let total: usize = counts.iter().sum();

    let mut log_result = log_factorial(total);
    for &k in counts {
        log_result -= log_factorial(k);
    }

    let result = (log_result.exp() + 0.5) as u64;

    MULTINOMIAL_CACHE.insert(sorted_counts, result);

    result
}

