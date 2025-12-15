#pragma once

#include <jsi/jsi.h>
#include "../cpp/common/jsi_install.h"

namespace facebook {
namespace jsi {
namespace chaosodds {

// Wrapper class for backwards compatibility
class ChaosOddsJSI {
public:
    static void install(Runtime& runtime) {
        chaosodds::install(runtime);
    }
};

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

