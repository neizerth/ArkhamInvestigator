#include "jsi_install.h"
#include "jsi_functions.h"
#include "ffi_declarations.h"
#include <ReactCommon/CallInvoker.h>
#include <thread>
#include <cstdio>
#include <optional>

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

void install(Runtime& runtime, std::shared_ptr<react::CallInvoker> jsInvoker) {
    LOGI("🔵 [JSI] install() called - starting JSI bindings installation");
    
    // CRITICAL: Validate runtime is valid before using it
    // This prevents SIGSEGV if runtime has been destroyed or is invalid
    try {
        auto testGlobal = runtime.global();
        (void)testGlobal; // Suppress unused variable warning
        LOGI("🔵 [JSI] Runtime validation passed - runtime is accessible");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Runtime validation failed - runtime is invalid: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Runtime validation failed - runtime is invalid (unknown exception)");
        return;
    }
    
    // CRITICAL: Check if bindings are already installed
    // This prevents SIGSEGV from multiple installations
    try {
        auto global = runtime.global();
        auto chaosOddsValue = global.getProperty(runtime, "ChaosOdds");
        if (chaosOddsValue.isObject()) {
            LOGI("⚠️ [JSI] ChaosOdds bindings already installed - skipping installation");
            LOGI("⚠️ [JSI] This prevents multiple installations which can cause SIGSEGV");
            return;
        }
    } catch (const std::exception& e) {
        // If getProperty throws, property doesn't exist, which is fine
        // We'll continue with installation
        LOGI("🔵 [JSI] ChaosOdds property does not exist yet - proceeding with installation");
    } catch (...) {
        // If getProperty throws unknown exception, continue anyway
        // Better to try installation than skip it
        LOGI("🔵 [JSI] Could not check for existing ChaosOdds property - proceeding with installation");
    }
    
    // Mark runtime as alive - CRITICAL for preventing use-after-free in pollResult
    functions::markRuntimeAlive();
    
    // Set CallInvoker for async operations
    if (jsInvoker) {
        LOGI("🔵 [JSI] Setting CallInvoker for async operations");
        functions::setCallInvoker(jsInvoker);
    } else {
        LOGI("⚠️ [JSI] CallInvoker is null - async operations may not work");
    }
    
    LOGI("🔵 [JSI] Creating ChaosOdds object");
    // Create object directly inside try block - Object doesn't have default constructor in iOS JSI
    std::optional<Object> chaosOddsOpt;
    try {
        chaosOddsOpt = Object(runtime);
        LOGI("🔵 [JSI] ChaosOdds object created successfully");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to create ChaosOdds object: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to create ChaosOdds object (unknown exception)");
        return;
    }
    
    if (!chaosOddsOpt.has_value()) {
        LOGE("❌ [JSI] ChaosOdds object is not initialized");
        return;
    }
    
    Object& chaosOdds = chaosOddsOpt.value();
    
    // Install calculate function
    LOGI("🔵 [JSI] Installing calculate function");
    try {
        auto calculateFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "calculate"),
            1,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::calculate(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "calculate", calculateFunc);
        LOGI("✅ [JSI] calculate function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install calculate function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install calculate function (unknown exception)");
        return;
    }
    
    // Install cancel function
    LOGI("🔵 [JSI] Installing cancel function");
    try {
        auto cancelFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "cancel"),
            0,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::cancel(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "cancel", cancelFunc);
        LOGI("✅ [JSI] cancel function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install cancel function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install cancel function (unknown exception)");
        return;
    }
    
    // Note: freeString removed - strings are now managed automatically by Hermes GC
    // Result strings are copied to std::string in C++ and Hermes manages the JS string lifetime
    
    // Install findTokens function
    LOGI("🔵 [JSI] Installing findTokens function");
    try {
        auto findTokensFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "findTokens"),
            3,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::findTokens(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "findTokens", findTokensFunc);
        LOGI("✅ [JSI] findTokens function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install findTokens function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install findTokens function (unknown exception)");
        return;
    }
    
    // Install calculateItem function
    LOGI("🔵 [JSI] Installing calculateItem function");
    try {
        auto calculateItemFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "calculateItem"),
            4,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::calculateItem(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "calculateItem", calculateItemFunc);
        LOGI("✅ [JSI] calculateItem function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install calculateItem function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install calculateItem function (unknown exception)");
        return;
    }
    
    // Install pollResult function
    LOGI("🔵 [JSI] Installing pollResult function");
    try {
        auto pollResultFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "pollResult"),
            1,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::pollResult(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "pollResult", pollResultFunc);
        LOGI("✅ [JSI] pollResult function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install pollResult function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install pollResult function (unknown exception)");
        return;
    }
    
    // Install setKeepAwakeEnabled function (iOS only, no-op on Android)
    LOGI("🔵 [JSI] Installing setKeepAwakeEnabled function");
    try {
        auto setKeepAwakeFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "setKeepAwakeEnabled"),
            1,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::setKeepAwakeEnabled(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "setKeepAwakeEnabled", setKeepAwakeFunc);
        LOGI("✅ [JSI] setKeepAwakeEnabled function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install setKeepAwakeEnabled function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install setKeepAwakeEnabled function (unknown exception)");
        return;
    }
    
    // Install version function
    LOGI("🔵 [JSI] Installing version function");
    try {
        auto versionFunc = Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "version"),
            0,
            [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
                return functions::version(rt, thisValue, args, count);
            }
        );
        chaosOdds.setProperty(runtime, "version", versionFunc);
        LOGI("✅ [JSI] version function installed");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to install version function: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to install version function (unknown exception)");
        return;
    }
    
    // Set global property
    LOGI("🔵 [JSI] Setting global.ChaosOdds property");
    try {
        runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
        LOGI("✅ [JSI] global.ChaosOdds property set successfully");
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Failed to set global.ChaosOdds property: %s", e.what());
        return;
    } catch (...) {
        LOGE("❌ [JSI] Failed to set global.ChaosOdds property (unknown exception)");
        return;
    }
    
    // Note: Multinomial cache is initialized lazily on first call to chaos_odds_calculate
    // or get_chaos_bag_modifiers, so no separate prewarm function is needed
    
    // Verify installation
    // NOTE: Removed asObject() calls to avoid ABI mismatch issues
    // In RN 0.79+, asObject() symbols may not be exported from libreactnative.so
    // Verification is not critical for functionality - just check that property exists
    try {
        auto global = runtime.global();
        auto chaosOddsValue = global.getProperty(runtime, "ChaosOdds");
        if (chaosOddsValue.isObject()) {
            LOGI("✅ [JSI] Verification: global.ChaosOdds is an object");
            // Skip detailed verification to avoid asObject() symbol resolution issues
        } else {
            LOGE("❌ [JSI] Verification failed: global.ChaosOdds is not an object");
        }
    } catch (const std::exception& e) {
        LOGE("❌ [JSI] Verification exception: %s", e.what());
    } catch (...) {
        LOGE("❌ [JSI] Verification unknown exception");
    }
    
    LOGI("✅ [JSI] install() completed successfully");
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

