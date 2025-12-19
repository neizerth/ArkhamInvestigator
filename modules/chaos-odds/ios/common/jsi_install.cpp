#include "jsi_install.h"
#include "jsi_functions.h"
#include "ffi_declarations.h"
#include <ReactCommon/CallInvoker.h>
#include <cstdio> // For iOS logging
#include <thread>

#define LOG_TAG "ChaosOdds"
#define LOGI(...) do { fprintf(stderr, "[ChaosOdds] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); } while(0)
#define LOGE(...) do { fprintf(stderr, "[ChaosOdds ERROR] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); } while(0)

namespace facebook {
namespace jsi {
namespace chaosodds {

void install(Runtime& runtime, std::shared_ptr<react::CallInvoker> jsInvoker) {
    LOGI("🔵 [JSI] install() called - starting JSI bindings installation");
    
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
    
    // Install freeString function
    LOGI("🔵 [JSI] Installing freeString function");
    auto freeStringFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "freeString"),
        1,
        [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
            return functions::freeString(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "freeString", freeStringFunc);
    LOGI("✅ [JSI] freeString function installed");
    
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
    
    // Set global property
    LOGI("🔵 [JSI] Setting global.ChaosOdds property");
    runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
    LOGI("✅ [JSI] global.ChaosOdds property set successfully");
    
    // Note: Multinomial cache is now initialized automatically on first call to calculate()
    // This avoids the need for a separate prewarm function and simplifies the API
    
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

void cleanup() {
    LOGI("🧹 [JSI] cleanup() called - clearing CallInvoker and canceling operations");
    functions::clearCallInvoker();
    LOGI("✅ [JSI] cleanup() completed");
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

