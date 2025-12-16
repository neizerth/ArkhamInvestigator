use dashmap::DashMap;
use smallvec::SmallVec;

// Cache key uses SmallVec to reduce allocations and keep on stack for small sizes
type CacheKey = SmallVec<[usize; 16]>;

lazy_static::lazy_static! {
    static ref MULTINOMIAL_CACHE: DashMap<CacheKey, u64> = DashMap::new();
}

// Precomputed factorials for small n (up to 20) to avoid ln/exp calculations
// 20! = 2432902008176640000 fits in u64, 21! = 51090942171709440000 overflows u64
const MAX_PRECOMPUTED_FACTORIAL: usize = 20;
lazy_static::lazy_static! {
    static ref FACTORIALS: Vec<u64> = {
        let mut facts = Vec::with_capacity(MAX_PRECOMPUTED_FACTORIAL + 1);
        facts.push(1); // 0! = 1
        let mut fact = 1u64;
        for i in 1..=MAX_PRECOMPUTED_FACTORIAL {
            // Use checked multiplication to detect overflow (shouldn't happen for i <= 20)
            fact = fact.checked_mul(i as u64).unwrap_or_else(|| {
                panic!("Factorial overflow at {}! (should not happen)", i);
            });
            facts.push(fact);
        }
        facts
    };
}

// Precomputed log-factorials for larger n (fallback when factorial overflows)
const MAX_PRECOMPUTED_LOG: usize = 50;
lazy_static::lazy_static! {
    static ref LOG_FACTORIALS: Vec<f64> = {
        let mut logs = Vec::with_capacity(MAX_PRECOMPUTED_LOG + 1);
        logs.push(0.0);
        let mut sum = 0.0;
        for i in 1..=MAX_PRECOMPUTED_LOG {
            sum += (i as f64).ln();
            logs.push(sum);
        }
        logs
    };
}

/// Get factorial for small n (direct lookup, no computation)
#[inline(always)]
fn factorial(n: usize) -> Option<u64> {
    if n <= MAX_PRECOMPUTED_FACTORIAL {
        Some(FACTORIALS[n])
    } else {
        None // Overflow or too large
    }
}

#[inline]
fn log_factorial(n: usize) -> f64 {
    if n <= MAX_PRECOMPUTED_LOG {
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
/// Optimized: uses precomputed factorials for small values (no ln/exp)
pub fn multinomial(counts: &[usize]) -> u64 {
    // Sort counts for cache key consistency
    let mut sorted_counts: CacheKey = counts.iter().copied().collect();
    sorted_counts.sort_unstable();

    if let Some(cached) = MULTINOMIAL_CACHE.get(&sorted_counts) {
        return *cached;
    }

    let total: usize = counts.iter().sum();

    // Fast path: use precomputed factorials if all values are small enough
    // This avoids expensive ln/exp calculations
    if total <= MAX_PRECOMPUTED_FACTORIAL {
        if let Some(total_fact) = factorial(total) {
            let mut denom = 1u64;
            let mut use_fast_path = true;
            
            for &k in &sorted_counts {
                if k > 0 {
                    if let Some(k_fact) = factorial(k) {
                        // Check for overflow before multiplication
                        if denom.checked_mul(k_fact).is_some() {
                            denom *= k_fact;
                        } else {
                            use_fast_path = false;
                            break;
                        }
                    } else {
                        use_fast_path = false;
                        break;
                    }
                }
            }

            if use_fast_path {
                let result = total_fact / denom;
                MULTINOMIAL_CACHE.insert(sorted_counts, result);
                return result;
            }
        }
    }

    // Slow path: use logarithms for large values or overflow cases
    let mut log_result = log_factorial(total);
    for &k in &sorted_counts {
        if k > 0 {
            log_result -= log_factorial(k);
        }
    }

    let result = (log_result.exp() + 0.5) as u64;

    MULTINOMIAL_CACHE.insert(sorted_counts, result);

    result
}

