#pragma once

#include <cstdint>

// Rust FFI declarations
extern "C" {
    const char* chaos_odds_calculate(const char* available, const char* revealed);
    const char* chaos_odds_find_tokens(const char* targets, const char* tokens, const char* params);
    void memory_free_string(const char* ptr);
    void chaos_odds_cancel();
    // Pre-initialize multinomial cache (call at app startup for better performance)
    // Returns 1 if initialization was needed (first call), 0 if already initialized
    uint8_t chaos_odds_prewarm();
}

