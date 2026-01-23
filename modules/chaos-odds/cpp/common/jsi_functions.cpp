#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"

#include <stdexcept>
#include <memory>

#ifdef __ANDROID__
#include <android/log.h>
#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)
#else
#include <cstdio>
#define LOGI(...) fprintf(stderr, "[ChaosOdds] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n")
#define LOGE(...) fprintf(stderr, "[ChaosOdds ERROR] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n")
#endif

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

// ============================================================================
// SYNCHRONOUS JSI PATTERN (Hermes-safe)
// ============================================================================
// All functions are synchronous and execute on JS thread.
// JSI objects are created ONLY during JS → Native call, never stored.
// No polling, no detached threads, no global storage, no lifecycle tracking.
// This is the ONLY safe pattern for Hermes JSI.

void setCallInvoker(std::shared_ptr<react::CallInvoker> jsInvoker) {
    // Synchronous pattern doesn't need CallInvoker
    (void)jsInvoker;
}

Value calculate(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    LOGI("⏱️ [JSI] calculate() called");
    
    // Validate arguments
    std::string available;
    std::string revealed;
    std::string errorMessage;
    
    try {
        helpers::validate_calculate_args(arguments, count);
        auto extracted = helpers::extract_strings(runtime, arguments, count);
        available = std::move(extracted.first);
        revealed  = std::move(extracted.second);
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    // If there's an error, throw exception (JS will catch it)
    if (!errorMessage.empty()) {
        throw std::runtime_error(errorMessage);
    }

    // Call synchronous Rust function - blocks until completion
    const char* result_ptr = chaos_odds_calculate(available.c_str(), revealed.c_str());
    
    if (result_ptr == nullptr) {
        throw std::runtime_error("chaos_odds_calculate returned null");
    }
    
    // Copy string immediately (Rust owns the memory, we need to free it)
    std::string result_str(result_ptr);
    memory_free_string(result_ptr);
    
    // Create JSI string and return (all on JS thread, runtime is guaranteed valid)
    return Value(String::createFromUtf8(runtime, result_str));
}

// pollResult REMOVED - synchronous pattern doesn't need polling

Value cancel(
    Runtime&,
    const Value&,
    const Value*,
    size_t
) {
    // Synchronous pattern doesn't need cancellation
    // But keep for backwards compatibility
    chaos_odds_cancel();
    return Value::undefined();
}

// Runtime lifecycle management REMOVED
// Synchronous pattern doesn't need lifecycle tracking
// JSI objects are created only during JS → Native calls, never stored

Value findTokens(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    LOGI("⏱️ [JSI] findTokens() called");
    
    // Validate arguments
    std::string targets;
    std::string tokens;
    std::string params;
    std::string errorMessage;
    
    try {
        if (count < 3) {
            throw std::runtime_error("findTokens() requires 3 arguments (targets, tokens, params)");
        }
        
        if (!arguments[0].isString()) {
            throw std::runtime_error("findTokens() first argument must be string (targets JSON)");
        }
        if (!arguments[1].isString()) {
            throw std::runtime_error("findTokens() second argument must be string (tokens JSON)");
        }
        if (!arguments[2].isString()) {
            throw std::runtime_error("findTokens() third argument must be string (params JSON)");
        }
        
        targets = arguments[0].asString(runtime).utf8(runtime);
        tokens = arguments[1].asString(runtime).utf8(runtime);
        params = arguments[2].asString(runtime).utf8(runtime);
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    // If there's an error, throw exception
    if (!errorMessage.empty()) {
        throw std::runtime_error(errorMessage);
    }

    // Call synchronous Rust function - blocks until completion
    const char* result_ptr = chaos_odds_find_tokens(
        targets.c_str(),
        tokens.c_str(),
        params.c_str()
    );
    
    if (result_ptr == nullptr) {
        throw std::runtime_error("chaos_odds_find_tokens returned null");
    }
    
    // Copy string immediately (Rust owns the memory, we need to free it)
    std::string result_str(result_ptr);
    memory_free_string(result_ptr);
    
    // Create JSI string and return (all on JS thread, runtime is guaranteed valid)
    return Value(String::createFromUtf8(runtime, result_str));
}

Value calculateItem(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    LOGI("⏱️ [JSI] calculateItem() called");
    
    // Validate arguments
    std::string available;
    std::string revealed;
    uint32_t skill_value = 0;
    uint32_t difficulty = 0;
    std::string errorMessage;
    
    try {
        if (count < 4) {
            throw std::runtime_error("calculateItem() requires 4 arguments (available, revealed, skill_value, difficulty)");
        }
        
        if (!arguments[0].isString()) {
            throw std::runtime_error("calculateItem() first argument must be string (available JSON)");
        }
        if (!arguments[1].isString()) {
            throw std::runtime_error("calculateItem() second argument must be string (revealed JSON)");
        }
        if (!arguments[2].isNumber()) {
            throw std::runtime_error("calculateItem() third argument must be number (skill_value)");
        }
        if (!arguments[3].isNumber()) {
            throw std::runtime_error("calculateItem() fourth argument must be number (difficulty)");
        }
        
        available = arguments[0].asString(runtime).utf8(runtime);
        revealed = arguments[1].asString(runtime).utf8(runtime);
        skill_value = static_cast<uint32_t>(arguments[2].asNumber());
        difficulty = static_cast<uint32_t>(arguments[3].asNumber());
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    // If there's an error, throw exception
    if (!errorMessage.empty()) {
        throw std::runtime_error(errorMessage);
    }

    // Call synchronous Rust function - blocks until completion
    const char* result_ptr = chaos_odds_calculate_item(
        available.c_str(),
        revealed.c_str(),
        skill_value,
        difficulty
    );
    
    if (result_ptr == nullptr) {
        throw std::runtime_error("chaos_odds_calculate_item returned null");
    }
    
    // Copy string immediately (Rust owns the memory, we need to free it)
    std::string result_str(result_ptr);
    memory_free_string(result_ptr);
    
    // Create JSI string and return (all on JS thread, runtime is guaranteed valid)
    return Value(String::createFromUtf8(runtime, result_str));
}

Value setKeepAwakeEnabled(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    // Android doesn't have UIApplication, so this is a no-op
    // On iOS, this is handled by the iOS-specific implementation
    (void)runtime;
    (void)arguments;
    (void)count;
    return Value::undefined();
}

Value version(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* /*arguments*/,
    size_t /*count*/
) {
    try {
        const char* version_ptr = chaos_odds_version();
        if (version_ptr == nullptr) {
            LOGE("❌ [JSI] version: Failed to get version from Rust");
            return Value::undefined();
        }
        
        // Copy the string immediately (Rust owns the memory, we need to free it)
        std::string version_str(version_ptr);
        memory_free_string(version_ptr);
        
        // Return as JSI string (all on JS thread, runtime is guaranteed valid)
        return Value(String::createFromUtf8(runtime, version_str));
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] version: Exception: %s", e.what());
        return Value::undefined();
    } catch (...) {
        LOGE("❌ [JSI] version: Unknown exception");
        return Value::undefined();
    }
}

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook
