#include <jni.h>
#include <jsi/jsi.h>
#include <ReactCommon/CallInvokerHolder.h>
#include "ChaosOddsJSI.h"

using namespace facebook;

extern "C" JNIEXPORT void JNICALL
Java_expo_modules_chaosodds_ChaosOddsJSIModule_nativeInstall(
    JNIEnv *env,
    jobject thiz,
    jlong jsiRuntimePointer
) {
    auto runtime = reinterpret_cast<jsi::Runtime *>(jsiRuntimePointer);
    if (runtime != nullptr) {
        jsi::chaosodds::ChaosOddsJSI::install(*runtime);
    }
}

