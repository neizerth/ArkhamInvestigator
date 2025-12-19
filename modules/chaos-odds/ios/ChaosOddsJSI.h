#pragma once

#include <jsi/jsi.h>
#include "common/jsi_install.h"
#include <cstdio> // For iOS logging

namespace facebook {
namespace jsi {
namespace chaosodds {

// Wrapper class for backwards compatibility (deprecated - use direct install() function)
class ChaosOddsJSI {
public:
    static void install(Runtime& runtime) {
        // Add logging to verify this method is called
        fprintf(stderr, "[ChaosOdds] 🔵 [JSI] ChaosOddsJSI::install() called (deprecated)\n");
        // Call install with nullptr for jsInvoker (deprecated - use direct install with CallInvoker)
        // The functions will work without CallInvoker, but async operations may not work
        chaosodds::install(runtime, nullptr);
        fprintf(stderr, "[ChaosOdds] ✅ [JSI] ChaosOddsJSI::install() completed\n");
    }
};

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

