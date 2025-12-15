#pragma once

// Rust FFI declarations
extern "C" {
    const char* chaos_odds_calculate(const char* available, const char* revealed);
    void memory_free_string(const char* ptr);
    void chaos_odds_cancel();
}

