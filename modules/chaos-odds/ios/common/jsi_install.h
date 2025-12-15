#pragma once

#include <jsi/jsi.h>

namespace facebook {
namespace jsi {
namespace chaosodds {

/// Install all JSI bindings to the runtime
void install(Runtime& runtime);

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

