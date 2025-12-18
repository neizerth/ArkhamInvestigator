#include <jni.h>
#include <jsi/jsi.h>
#include "ChaosOddsJSI.h"
#include <ReactCommon/CallInvokerHolder.h>
#include <android/log.h>
#include <fbjni/fbjni.h>

#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

using namespace facebook;

// JNI function for ChaosOddsJSIModulePackage
// Package: expo.modules.chaosodds
// Class: ChaosOddsJSIModulePackage
// Method: nativeInstall
// This is called by React Native's ReactPackage system
extern "C" JNIEXPORT void JNICALL
Java_expo_modules_chaosodds_ChaosOddsJSIModulePackage_nativeInstall(
    JNIEnv *env,
    jobject thiz,
    jlong runtimePtr,
    jobject callInvokerHolderImpl
) {
    LOGI("🔵 [JNI] nativeInstall called with runtime pointer: %lld", (long long)runtimePtr);
    
    if (runtimePtr == 0) {
        LOGE("❌ [JNI] Runtime pointer is null - cannot install JSI bindings");
        return;
    }
    
    // Install JSI bindings
    // runtimePtr is provided by React Native's JSIModulePackage system
    // and is guaranteed to be valid at this point
    auto runtime = reinterpret_cast<jsi::Runtime *>(runtimePtr);
    LOGI("🔵 [JNI] Runtime pointer is valid");
    
    // Extract CallInvoker from CallInvokerHolderImpl if provided
    std::shared_ptr<react::CallInvoker> jsInvoker = nullptr;
    if (callInvokerHolderImpl != nullptr) {
        try {
            // Cast jobject to alias_ref for CallInvokerHolder
            // Use wrap_alias to convert jobject to alias_ref<jobject>, then use static_ref_cast function
            auto callInvokerHolderRef = jni::wrap_alias(static_cast<jobject>(callInvokerHolderImpl));
            auto callInvokerHolder = jni::static_ref_cast<react::CallInvokerHolder::javaobject>(callInvokerHolderRef);
            jsInvoker = callInvokerHolder->cthis()->getCallInvoker();
            if (jsInvoker) {
                LOGI("✅ [JNI] CallInvoker extracted from CallInvokerHolderImpl");
            } else {
                LOGE("⚠️ [JNI] CallInvoker is null in CallInvokerHolderImpl");
            }
        } catch (const std::exception& e) {
            LOGE("❌ [JNI] Failed to extract CallInvoker: %s", e.what());
        } catch (...) {
            LOGE("❌ [JNI] Unknown exception extracting CallInvoker");
        }
    } else {
        LOGE("⚠️ [JNI] CallInvokerHolderImpl is null - async operations may not work");
    }
    
    LOGI("🔵 [JNI] Calling ChaosOddsJSI::install");
    try {
        // Use the direct install function that accepts CallInvoker
        jsi::chaosodds::install(*runtime, jsInvoker);
        LOGI("✅ [JNI] ChaosOddsJSI::install completed successfully");
    } catch (const std::exception& e) {
        LOGE("❌ [JNI] Exception in ChaosOddsJSI::install: %s", e.what());
    } catch (...) {
        LOGE("❌ [JNI] Unknown exception in ChaosOddsJSI::install");
    }
    
    LOGI("✅ [JNI] nativeInstall finished");
}

