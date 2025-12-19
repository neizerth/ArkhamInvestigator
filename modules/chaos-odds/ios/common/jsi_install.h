#pragma once

#include <jsi/jsi.h>
#include <ReactCommon/CallInvoker.h>
#include <memory>

namespace facebook {
namespace jsi {
namespace chaosodds {

/// Install all JSI bindings to the runtime
/// @param runtime JSI Runtime
/// @param jsInvoker CallInvoker for scheduling work on JS thread (can be nullptr)
void install(Runtime& runtime, std::shared_ptr<react::CallInvoker> jsInvoker = nullptr);

/// Cleanup JSI bindings and clear CallInvoker
void cleanup();

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

