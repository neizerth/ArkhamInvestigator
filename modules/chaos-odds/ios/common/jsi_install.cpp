#include "jsi_install.h"
#include "jsi_functions.h"
#include "ffi_declarations.h"
#include <ReactCommon/CallInvoker.h>
#include <thread>
#include <cstdio>

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
    auto chaosOdds = Object(runtime);
    
    // Install calculate function
    LOGI("🔵 [JSI] Installing calculate function");
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
    
    // Install cancel function
    LOGI("🔵 [JSI] Installing cancel function");
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
    
    // Note: freeString removed - strings are now managed automatically by Hermes GC
    // Result strings are copied to std::string in C++ and Hermes manages the JS string lifetime
    
    // Install findTokens function
    LOGI("🔵 [JSI] Installing findTokens function");
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
    
    // Install calculateItem function
    LOGI("🔵 [JSI] Installing calculateItem function");
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
    
    // Install pollResult function
    LOGI("🔵 [JSI] Installing pollResult function");
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
    
    // Install setKeepAwakeEnabled function (iOS only, no-op on Android)
    LOGI("🔵 [JSI] Installing setKeepAwakeEnabled function");
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
    
    // Install version function
    LOGI("🔵 [JSI] Installing version function");
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
    
    // Set global property
    LOGI("🔵 [JSI] Setting global.ChaosOdds property");
    runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
    LOGI("✅ [JSI] global.ChaosOdds property set successfully");
    
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

