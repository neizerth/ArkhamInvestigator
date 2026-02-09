#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"

#include <exception>
#include <string>

#ifdef __ANDROID__
#include <android/log.h>
#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)
#else
// iOS logging - use fprintf(stderr) for all threads
#define LOGI(...) do { fprintf(stderr, "[ChaosOdds] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); fflush(stderr); } while(0)
#define LOGE(...) do { fprintf(stderr, "[ChaosOdds ERROR] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); fflush(stderr); } while(0)
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
    // CRITICAL: Guard before any arguments access - Hermes SIGSEGV otherwise
    if (!arguments || count < 1) {
        throw JSError(runtime, "calculate() requires at least 1 argument (available)");
    }

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

    if (!errorMessage.empty()) {
        throw JSError(runtime, errorMessage);
    }

    LOGI("🔵 [JSI] Calling chaos_odds_calculate with available: %s, revealed: %s", 
         available.c_str(), revealed.c_str());
    
    const char* result_ptr = chaos_odds_calculate(available.c_str(), revealed.c_str());
    if (result_ptr == nullptr) {
        LOGE("❌ [JSI] chaos_odds_calculate returned null");
        throw JSError(runtime, "chaos_odds_calculate returned null");
    }

    std::string result_str(result_ptr);
    LOGI("🔵 [JSI] chaos_odds_calculate returned string of length: %zu, first 100 chars: %s", 
         result_str.length(), result_str.substr(0, 100).c_str());
    
    memory_free_string(result_ptr);
    
    // CRITICAL: Ensure we return a String value, not a number
    auto result_value = Value(String::createFromUtf8(runtime, result_str));
    LOGI("✅ [JSI] Returning String value to JS");
    return result_value;
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
    if (!arguments || count < 3) {
        throw JSError(runtime, "findTokens() requires 3 arguments (targets, tokens, params)");
    }
    if (!arguments[0].isString()) {
        throw JSError(runtime, "findTokens() first argument must be string (targets JSON)");
    }
    if (!arguments[1].isString()) {
        throw JSError(runtime, "findTokens() second argument must be string (tokens JSON)");
    }
    if (!arguments[2].isString()) {
        throw JSError(runtime, "findTokens() third argument must be string (params JSON)");
    }

    std::string targets = arguments[0].asString(runtime).utf8(runtime);
    std::string tokens = arguments[1].asString(runtime).utf8(runtime);
    std::string params = arguments[2].asString(runtime).utf8(runtime);

    const char* result_ptr = chaos_odds_find_tokens(
        targets.c_str(), tokens.c_str(), params.c_str()
    );
    if (result_ptr == nullptr) {
        throw JSError(runtime, "chaos_odds_find_tokens returned null");
    }

    std::string result_str(result_ptr);
    memory_free_string(result_ptr);
    return Value(String::createFromUtf8(runtime, result_str));
}

Value calculateItem(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    if (!arguments || count < 4) {
        throw JSError(runtime, "calculateItem() requires 4 arguments (available, revealed, skill_value, difficulty)");
    }
    if (!arguments[0].isString()) {
        throw JSError(runtime, "calculateItem() first argument must be string (available JSON)");
    }
    if (!arguments[1].isString()) {
        throw JSError(runtime, "calculateItem() second argument must be string (revealed JSON)");
    }
    if (!arguments[2].isNumber()) {
        throw JSError(runtime, "calculateItem() third argument must be number (skill_value)");
    }
    if (!arguments[3].isNumber()) {
        throw JSError(runtime, "calculateItem() fourth argument must be number (difficulty)");
    }

    std::string available = arguments[0].asString(runtime).utf8(runtime);
    std::string revealed = arguments[1].asString(runtime).utf8(runtime);
    uint32_t skill_value = static_cast<uint32_t>(arguments[2].asNumber());
    uint32_t difficulty = static_cast<uint32_t>(arguments[3].asNumber());

    const char* result_ptr = chaos_odds_calculate_item(
        available.c_str(), revealed.c_str(), skill_value, difficulty
    );
    if (result_ptr == nullptr) {
        throw JSError(runtime, "chaos_odds_calculate_item returned null");
    }

    std::string result_str(result_ptr);
    memory_free_string(result_ptr);
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
    const char* version_ptr = chaos_odds_version();
    if (!version_ptr) {
        return Value::undefined();
    }
    std::string version_str(version_ptr);
    memory_free_string(version_ptr);
    return Value(String::createFromUtf8(runtime, version_str));
}

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook
