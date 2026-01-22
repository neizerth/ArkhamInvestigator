#include <jni.h>
#include <jsi/jsi.h>
#include "ChaosOddsJSI.h"
#include "common/jsi_functions.h"
#include <ReactCommon/CallInvokerHolder.h>
#include <android/log.h>
#include <fbjni/fbjni.h>
#include <atomic>

#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

using namespace facebook;

// CRITICAL: Guard to prevent double installation
// This must be static and atomic to prevent race conditions
static std::atomic<bool> installed{false};

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
    
    // CRITICAL: Guard against double installation
    // If already installed, return immediately to prevent SIGSEGV
    if (installed.exchange(true)) {
        LOGI("⚠️ [JNI] JSI bindings already installed, skipping (guard protection)");
        return;
    }
    
    if (runtimePtr == 0) {
        LOGE("❌ [JNI] Runtime pointer is null - cannot install JSI bindings");
        return;
    }
    
    // Install JSI bindings
    // runtimePtr is provided by React Native's JSIModulePackage system
    // Cast jlong to jsi::Runtime* pointer
    auto runtime = reinterpret_cast<jsi::Runtime *>(runtimePtr);
    
    // CRITICAL: Validate runtime pointer is accessible before using it
    // This prevents SIGSEGV if runtime has been destroyed or pointer is invalid
    if (runtime == nullptr) {
        LOGE("❌ [JNI] Runtime pointer is null after cast - cannot install JSI bindings");
        return;
    }
    
    // CRITICAL: Additional validation - check if runtime is ready for use
    // Runtime might exist but not be fully initialized yet, which causes SIGSEGV
    // We need to validate it's actually ready before dereferencing
    try {
        // Try to access runtime global object - this will fail if runtime is not ready
        // This is a minimal operation that validates runtime is fully initialized
        auto testGlobal = runtime->global();
        
        // Additional check: try to get a property to ensure runtime is fully functional
        // This helps catch cases where runtime exists but is in an invalid state
        try {
            testGlobal.getProperty(*runtime, "undefined");
            // If we get here without exception, runtime is ready
            LOGI("🔵 [JNI] Runtime pointer validation passed - runtime is accessible and ready");
        } catch (...) {
            // getProperty may throw if property doesn't exist, but that's OK
            // The important thing is runtime->global() worked
            LOGI("🔵 [JNI] Runtime pointer validation passed - runtime is accessible");
        }
    } catch (const std::exception& e) {
        LOGE("❌ [JNI] Runtime pointer validation failed - runtime is not ready: %s", e.what());
        LOGE("❌ [JNI] Runtime may exist but is not fully initialized yet");
        // Reset flag on validation failure to allow retry
        installed.store(false);
        return;
    } catch (...) {
        LOGE("❌ [JNI] Runtime pointer validation failed - runtime is not ready (unknown exception)");
        LOGE("❌ [JNI] Runtime may exist but is not fully initialized yet");
        // Reset flag on validation failure to allow retry
        installed.store(false);
        return;
    }
    
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
        // The install function will perform additional runtime validation
        jsi::chaosodds::install(*runtime, jsInvoker);
        LOGI("✅ [JNI] ChaosOddsJSI::install completed successfully");
    } catch (const std::exception& e) {
        LOGE("❌ [JNI] Exception in ChaosOddsJSI::install: %s", e.what());
        // Reset flag on failure to allow retry
        installed.store(false);
    } catch (...) {
        LOGE("❌ [JNI] Unknown exception in ChaosOddsJSI::install");
        // Reset flag on failure to allow retry
        installed.store(false);
    }
    
    LOGI("✅ [JNI] nativeInstall finished");
}

// JNI function to mark runtime as dead
// This should be called when ReactApplicationContext is invalidated/destroyed
// For @JvmStatic functions in companion object, JNI name is without $Companion
extern "C" JNIEXPORT void JNICALL
Java_expo_modules_chaosodds_ChaosOddsJSIModulePackage_nativeMarkRuntimeDead(
    JNIEnv *env,
    jclass clazz
) {
    LOGI("🔵 [JNI] nativeMarkRuntimeDead called");
    try {
        jsi::chaosodds::functions::markRuntimeDead();
        // Reset installation flag to allow re-installation on next runtime creation
        installed.store(false);
        LOGI("✅ [JNI] Runtime marked as dead successfully, installation flag reset");
    } catch (const std::exception& e) {
        LOGE("❌ [JNI] Exception in markRuntimeDead: %s", e.what());
    } catch (...) {
        LOGE("❌ [JNI] Unknown exception in markRuntimeDead");
    }
}

