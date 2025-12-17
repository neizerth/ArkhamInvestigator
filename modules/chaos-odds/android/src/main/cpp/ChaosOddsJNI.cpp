#include <jni.h>
#include <jsi/jsi.h>
#include "ChaosOddsJSI.h"
#include <android/log.h>

#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

using namespace facebook;

extern "C" JNIEXPORT void JNICALL
Java_expo_modules_chaosodds_ChaosOddsModule_nativeInstall(
    JNIEnv *env,
    jobject thiz
) {
    // Get runtime from ReactApplicationContext via JNI
    // This approach works with Expo Modules by accessing the runtime through JNI
    
    // Get appContext from Module
    jclass moduleClass = env->GetObjectClass(thiz);
    jfieldID appContextField = env->GetFieldID(moduleClass, "appContext", "Lexpo/modules/kotlin/AppContext;");
    if (!appContextField) {
        LOGE("Failed to get appContext field");
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    jobject appContext = env->GetObjectField(thiz, appContextField);
    if (!appContext) {
        LOGE("Failed to get appContext");
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    // Get reactContext from AppContext
    jclass appContextClass = env->GetObjectClass(appContext);
    jfieldID reactContextField = env->GetFieldID(appContextClass, "reactContext", "Lcom/facebook/react/bridge/ReactApplicationContext;");
    
    if (!reactContextField) {
        LOGE("Failed to get reactContext field");
        env->DeleteLocalRef(appContextClass);
        env->DeleteLocalRef(appContext);
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    jobject reactContext = env->GetObjectField(appContext, reactContextField);
    if (!reactContext) {
        LOGE("Failed to get reactContext - runtime may not be ready yet");
        env->DeleteLocalRef(appContextClass);
        env->DeleteLocalRef(appContext);
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    // Get JavaScriptContextHolder
    jclass reactContextClass = env->GetObjectClass(reactContext);
    jmethodID getJSContextMethod = env->GetMethodID(reactContextClass, "getJavaScriptContextHolder", "()Lcom/facebook/react/bridge/JavaScriptContextHolder;");
    
    if (!getJSContextMethod) {
        LOGE("Failed to get getJavaScriptContextHolder method");
        env->DeleteLocalRef(reactContextClass);
        env->DeleteLocalRef(reactContext);
        env->DeleteLocalRef(appContextClass);
        env->DeleteLocalRef(appContext);
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    jobject jsContextHolder = env->CallObjectMethod(reactContext, getJSContextMethod);
    if (!jsContextHolder) {
        LOGE("Failed to get JavaScriptContextHolder - runtime may not be ready yet");
        env->DeleteLocalRef(reactContextClass);
        env->DeleteLocalRef(reactContext);
        env->DeleteLocalRef(appContextClass);
        env->DeleteLocalRef(appContext);
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    // Get runtime pointer
    jclass jsContextHolderClass = env->GetObjectClass(jsContextHolder);
    jmethodID getMethod = env->GetMethodID(jsContextHolderClass, "get", "()J");
    
    if (!getMethod) {
        LOGE("Failed to get get method");
        env->DeleteLocalRef(jsContextHolderClass);
        env->DeleteLocalRef(jsContextHolder);
        env->DeleteLocalRef(reactContextClass);
        env->DeleteLocalRef(reactContext);
        env->DeleteLocalRef(appContextClass);
        env->DeleteLocalRef(appContext);
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    jlong runtimePtr = env->CallLongMethod(jsContextHolder, getMethod);
    if (runtimePtr == 0) {
        LOGE("Runtime pointer is null - runtime may not be ready yet");
        env->DeleteLocalRef(jsContextHolderClass);
        env->DeleteLocalRef(jsContextHolder);
        env->DeleteLocalRef(reactContextClass);
        env->DeleteLocalRef(reactContext);
        env->DeleteLocalRef(appContextClass);
        env->DeleteLocalRef(appContext);
        env->DeleteLocalRef(moduleClass);
        return;
    }
    
    // Install JSI bindings
    auto runtime = reinterpret_cast<jsi::Runtime *>(runtimePtr);
    LOGI("Installing JSI bindings");
    jsi::chaosodds::ChaosOddsJSI::install(*runtime);
    LOGI("JSI bindings installed successfully");
    
    // Cleanup
    env->DeleteLocalRef(jsContextHolderClass);
    env->DeleteLocalRef(jsContextHolder);
    env->DeleteLocalRef(reactContextClass);
    env->DeleteLocalRef(reactContext);
    env->DeleteLocalRef(appContextClass);
    env->DeleteLocalRef(appContext);
    env->DeleteLocalRef(moduleClass);
}

