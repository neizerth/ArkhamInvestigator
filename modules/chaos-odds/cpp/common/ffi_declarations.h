#pragma once

#include <cstdint>

// Rust FFI declarations
extern "C" {
    // Synchronous functions (blocking)
    const char* chaos_odds_calculate(const char* available, const char* revealed);
    const char* chaos_odds_find_tokens(const char* targets, const char* tokens, const char* params);
    const char* chaos_odds_calculate_item(const char* available, const char* revealed, uint32_t skill_value, uint32_t difficulty);
    
    // Async functions (non-blocking, callback-based)
    // Callback signature: void callback(uint32_t callback_id, const char* result)
    // callback_id: unique identifier for this calculation (used to find corresponding C++ callback)
    // result: JSON string pointer (must be freed with memory_free_string) or null if cancelled/error
    typedef void (*chaos_odds_async_callback_t)(uint32_t callback_id, const char* result);
    void chaos_odds_calculate_async(const char* available, const char* revealed, uint32_t callback_id, chaos_odds_async_callback_t callback);
    
    // Memory management
    void memory_free_string(const char* ptr);
    
    // Cancellation
    void chaos_odds_cancel();
    void chaos_odds_reset_cancel_flag(); // Reset cancel flag - call BEFORE new calculation, AFTER previous threads completed
    
    // Version info
    const char* chaos_odds_version(); // Returns version string (must be freed with memory_free_string)
}

