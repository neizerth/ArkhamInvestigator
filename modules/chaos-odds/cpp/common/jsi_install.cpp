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
    
    // CRITICAL: NO runtime validation - we trust RN that runtime is valid
    // Any runtime.global() or getProperty() here = SIGSEGV risk
    // We install immediately - if runtime is dead, we'll crash, but that's better than false security
    
    // CRITICAL: Check if bindings are already installed
    // BUT: NO try/catch around runtime operations - if runtime is dead, we crash immediately
    // This is intentional - better to crash early than have false security
    auto global = runtime.global();
    auto chaosOddsValue = global.getProperty(runtime, "ChaosOdds");
    if (chaosOddsValue.isObject()) {
        LOGI("⚠️ [JSI] ChaosOdds bindings already installed - skipping installation");
        return;
    }
    
    // Synchronous pattern doesn't need CallInvoker
    (void)jsInvoker; // Suppress unused warning
    
    LOGI("🔵 [JSI] Creating ChaosOdds object");
    auto chaosOdds = Object(runtime);
    LOGI("🔵 [JSI] ChaosOdds object created successfully");
    
    // Install calculate function
    LOGI("🔵 [JSI] Installing calculate function");
    auto calculateFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forUtf8(runtime, "calculate"),
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
        PropNameID::forUtf8(runtime, "cancel"),
        0,
        [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
            return functions::cancel(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "cancel", cancelFunc);
    LOGI("✅ [JSI] cancel function installed");
    
    // Install findTokens function
    LOGI("🔵 [JSI] Installing findTokens function");
    auto findTokensFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forUtf8(runtime, "findTokens"),
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
        PropNameID::forUtf8(runtime, "calculateItem"),
        4,
        [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
            return functions::calculateItem(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "calculateItem", calculateItemFunc);
    LOGI("✅ [JSI] calculateItem function installed");
    
    // pollResult REMOVED - synchronous pattern doesn't need polling
    
    // Install setKeepAwakeEnabled function (iOS only, no-op on Android)
    LOGI("🔵 [JSI] Installing setKeepAwakeEnabled function");
    auto setKeepAwakeFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forUtf8(runtime, "setKeepAwakeEnabled"),
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
        PropNameID::forUtf8(runtime, "version"),
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
    
    // Synchronous pattern doesn't need lifecycle tracking
    // JSI objects are created only during JS → Native calls, never stored
    
    LOGI("✅ [JSI] install() completed successfully");
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook
