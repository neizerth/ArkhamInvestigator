#pragma once

#include <jsi/jsi.h>
#include <ReactCommon/CallInvoker.h>
#include <memory>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

/// Set CallInvoker for async operations (deprecated - no longer used with polling pattern)
void setCallInvoker(std::shared_ptr<react::CallInvoker> jsInvoker);

/// Poll result for a task
Value pollResult(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Mark runtime as alive (call when JSI bindings are installed)
void markRuntimeAlive();

/// Mark runtime as dead and clear all task storage (call when Runtime is invalidated)
void markRuntimeDead();

/// Calculate chaos bag odds
Value calculate(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Cancel ongoing calculation
Value cancel(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Find token odds (probability that target tokens appear)
Value findTokens(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Calculate odds for a specific skill/difficulty combination
Value calculateItem(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Set iOS idle timer disabled state (iOS only, no-op on other platforms)
Value setKeepAwakeEnabled(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Get version string from Rust
Value version(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

