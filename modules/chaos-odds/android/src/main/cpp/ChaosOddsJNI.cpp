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
    
    // CRITICAL: Check pointer validity - only null check, NO runtime operations
    if (runtimePtr == 0) {
        LOGE("❌ [JNI] Runtime pointer is null - cannot install JSI bindings");
        installed.store(false);
        return;
    }
    
    // CRITICAL: Guard against double installation - check BEFORE any operations
    // If already installed, return immediately
    // We trust RN that runtime is valid when it calls us
    if (installed.exchange(true)) {
        LOGI("⚠️ [JNI] JSI bindings already installed, skipping (guard protection)");
        return;
    }
    
    // Cast jlong to jsi::Runtime* pointer
    // CRITICAL: NO validation of runtime - we trust RN
    // Any runtime.global() or getProperty() here = SIGSEGV risk
    auto runtime = reinterpret_cast<jsi::Runtime *>(runtimePtr);
    
    if (runtime == nullptr) {
        LOGE("❌ [JNI] Runtime pointer is null after cast - cannot install JSI bindings");
        installed.store(false);
        return;
    }
    
    // Extract CallInvoker from CallInvokerHolderImpl if provided
    // CRITICAL: We don't store CallInvoker globally - it's passed to install() but not cached
    std::shared_ptr<react::CallInvoker> jsInvoker = nullptr;
    if (callInvokerHolderImpl != nullptr) {
        try {
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
    
    // CRITICAL: Install immediately - NO runtime validation, NO checks
    // We trust RN that runtime is valid when it calls us
    // Any runtime.global() or getProperty() before install() = SIGSEGV risk
    LOGI("🔵 [JNI] Calling ChaosOddsJSI::install");
    try {
        // Use the direct install function that accepts CallInvoker
        // install() will do minimal checks and install bindings
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

// JNI function to mark runtime as dead - REMOVED
// Synchronous pattern doesn't need lifecycle tracking
// Installation flag is reset automatically on next install() call
extern "C" JNIEXPORT void JNICALL
Java_expo_modules_chaosodds_ChaosOddsJSIModulePackage_nativeMarkRuntimeDead(
    JNIEnv *env,
    jclass clazz
) {
    LOGI("🔵 [JNI] nativeMarkRuntimeDead called (no-op in synchronous pattern)");
    // Reset installation flag to allow re-installation on next runtime creation
    installed.store(false);
    LOGI("✅ [JNI] Installation flag reset");
}
