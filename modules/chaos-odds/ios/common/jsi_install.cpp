#include "jsi_install.h"
#include "jsi_functions.h"
#include <ReactCommon/CallInvoker.h>
#include <android/log.h>

#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

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
    
    // Set global property
    LOGI("🔵 [JSI] Setting global.ChaosOdds property");
    runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
    LOGI("✅ [JSI] global.ChaosOdds property set successfully");
    
    // Verify installation
    try {
        auto global = runtime.global();
        auto chaosOddsValue = global.getProperty(runtime, "ChaosOdds");
        if (chaosOddsValue.isObject()) {
            LOGI("✅ [JSI] Verification: global.ChaosOdds is an object");
            auto chaosOddsObj = chaosOddsValue.asObject(runtime);
            auto calculateProp = chaosOddsObj.getProperty(runtime, "calculate");
            if (calculateProp.isObject() && calculateProp.asObject(runtime).isFunction(runtime)) {
                LOGI("✅ [JSI] Verification: global.ChaosOdds.calculate is a function");
            } else {
                LOGE("❌ [JSI] Verification failed: global.ChaosOdds.calculate is not a function");
            }
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

