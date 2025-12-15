use rustc_hash::FxHashMap;
use std::sync::Mutex;

// Global cache for multinomial calculations
lazy_static::lazy_static! {
    static ref MULTINOMIAL_CACHE: Mutex<FxHashMap<Vec<usize>, u64>> = Mutex::new(FxHashMap::default());
}

/// Compute multinomial coefficient using logarithms to avoid overflow
/// multinomial(n; k1, k2, ...) = n! / (k1! * k2! * ...)
/// Uses memoization to cache results across function calls
pub fn multinomial(counts: &[usize]) -> u64 {
    // Create a sorted copy for cache key consistency
    let mut sorted_counts = counts.to_vec();
    sorted_counts.sort_unstable();
    
    // Check cache first
    {
        let cache = MULTINOMIAL_CACHE.lock().unwrap();
        if let Some(&cached) = cache.get(&sorted_counts) {
            return cached;
        }
    }
    
    // Compute multinomial using logarithms to avoid overflow
    let total: usize = counts.iter().sum();
    
    let mut log_result = 0.0;
    // Compute log(n!)
    for i in 1..=total {
        log_result += (i as f64).ln();
    }
    // Subtract log(k1!) + log(k2!) + ...
    for &k in counts {
        for i in 1..=k {
            log_result -= (i as f64).ln();
        }
    }
    // Convert back from log space and round to nearest u64
    let result = (log_result.exp() + 0.5) as u64;
    
    // Cache the result
    {
        let mut cache = MULTINOMIAL_CACHE.lock().unwrap();
        cache.insert(sorted_counts, result);
    }
    
    result
}

