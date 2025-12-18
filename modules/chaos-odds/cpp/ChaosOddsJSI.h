#pragma once

#include <jsi/jsi.h>
#include "common/jsi_install.h"
#ifdef __ANDROID__
#include <android/log.h>
#endif

namespace facebook {
namespace jsi {
namespace chaosodds {

// Wrapper class for backwards compatibility (deprecated - use direct install() function)
class ChaosOddsJSI {
public:
    static void install(Runtime& runtime) {
        // Add logging to verify this method is called
        #ifdef __ANDROID__
        __android_log_print(ANDROID_LOG_INFO, "ChaosOdds", "🔵 [JSI] ChaosOddsJSI::install() called (deprecated)");
        #endif
        // Call install with nullptr for jsInvoker (deprecated - use direct install with CallInvoker)
        // The functions will work without CallInvoker, but async operations may not work
        chaosodds::install(runtime, nullptr);
        #ifdef __ANDROID__
        __android_log_print(ANDROID_LOG_INFO, "ChaosOdds", "✅ [JSI] ChaosOddsJSI::install() completed");
        #endif
    }
};

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

