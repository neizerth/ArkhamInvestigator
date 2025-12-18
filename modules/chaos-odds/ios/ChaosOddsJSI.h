#pragma once

#include <jsi/jsi.h>
#include "common/jsi_install.h"
#ifdef __ANDROID__
#include <android/log.h>
#endif

namespace facebook {
namespace jsi {
namespace chaosodds {

// Wrapper class for backwards compatibility
class ChaosOddsJSI {
public:
    static void install(Runtime& runtime) {
        // Add logging to verify this method is called
        #ifdef __ANDROID__
        __android_log_print(ANDROID_LOG_INFO, "ChaosOdds", "🔵 [JSI] ChaosOddsJSI::install() called");
        #endif
        chaosodds::install(runtime);
        #ifdef __ANDROID__
        __android_log_print(ANDROID_LOG_INFO, "ChaosOdds", "✅ [JSI] ChaosOddsJSI::install() completed");
        #endif
    }
};

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

