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
    
    // 1. Проверка на двойную установку (Hermes не любит переопределение глобалов при инициализации)
    // Используем безопасную проверку hasProperty вместо getProperty
    if (runtime.global().hasProperty(runtime, "ChaosOdds")) {
        LOGI("⚠️ [JSI] ChaosOdds already installed, skipping");
        return;
    }
    
    (void)jsInvoker;
    
    LOGI("🔵 [JSI] Creating ChaosOdds object");
    Object chaosOdds(runtime);
    LOGI("🔵 [JSI] ChaosOdds object created successfully");
    
    // Прямая установка: меньше оберток — меньше шансов на крэш vtable
    // Используем прямое создание без промежуточных лямбд-помощников
    LOGI("🔵 [JSI] Installing calculate function");
    chaosOdds.setProperty(
        runtime,
        PropNameID::forUtf8(runtime, "calculate"),
        Function::createFromHostFunction(
            runtime,
            PropNameID::forUtf8(runtime, "calculate"),
            2,  // CRITICAL: calculate() takes 2 arguments: available and revealed
            functions::calculate
        )
    );
    LOGI("✅ [JSI] calculate function installed");
    
    LOGI("🔵 [JSI] Installing cancel function");
    chaosOdds.setProperty(
        runtime,
        PropNameID::forUtf8(runtime, "cancel"),
        Function::createFromHostFunction(
            runtime,
            PropNameID::forUtf8(runtime, "cancel"),
            0,
            functions::cancel
        )
    );
    LOGI("✅ [JSI] cancel function installed");
    
    LOGI("🔵 [JSI] Installing findTokens function");
    chaosOdds.setProperty(
        runtime,
        PropNameID::forUtf8(runtime, "findTokens"),
        Function::createFromHostFunction(
            runtime,
            PropNameID::forUtf8(runtime, "findTokens"),
            3,
            functions::findTokens
        )
    );
    LOGI("✅ [JSI] findTokens function installed");
    
    LOGI("🔵 [JSI] Installing calculateItem function");
    chaosOdds.setProperty(
        runtime,
        PropNameID::forUtf8(runtime, "calculateItem"),
        Function::createFromHostFunction(
            runtime,
            PropNameID::forUtf8(runtime, "calculateItem"),
            4,
            functions::calculateItem
        )
    );
    LOGI("✅ [JSI] calculateItem function installed");
    
    LOGI("🔵 [JSI] Installing setKeepAwakeEnabled function");
    chaosOdds.setProperty(
        runtime,
        PropNameID::forUtf8(runtime, "setKeepAwakeEnabled"),
        Function::createFromHostFunction(
            runtime,
            PropNameID::forUtf8(runtime, "setKeepAwakeEnabled"),
            1,
            functions::setKeepAwakeEnabled
        )
    );
    LOGI("✅ [JSI] setKeepAwakeEnabled function installed");
    
    LOGI("🔵 [JSI] Installing version function");
    chaosOdds.setProperty(
        runtime,
        PropNameID::forUtf8(runtime, "version"),
        Function::createFromHostFunction(
            runtime,
            PropNameID::forUtf8(runtime, "version"),
            0,
            functions::version
        )
    );
    LOGI("✅ [JSI] version function installed");
    
    // Установка в global в самом конце - после полного создания объекта
    LOGI("🔵 [JSI] Setting global.ChaosOdds property");
    runtime.global().setProperty(runtime, "ChaosOdds", std::move(chaosOdds));
    LOGI("✅ [JSI] global.ChaosOdds property set successfully");
    
    LOGI("✅ [JSI] install() completed successfully");
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook
