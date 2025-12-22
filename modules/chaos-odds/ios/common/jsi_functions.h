#pragma once

#include <jsi/jsi.h>
#include <ReactCommon/CallInvoker.h>
#include <memory>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

/// Set CallInvoker for async operations (must be called before using calculate)
void setCallInvoker(std::shared_ptr<react::CallInvoker> jsInvoker);

/// Clear CallInvoker (call this during cleanup/invalidate to prevent use-after-free)
void clearCallInvoker();

/// Calculate chaos bag odds
Value calculate(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Cancel ongoing calculation
Value cancel(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Free memory allocated by calculate
Value freeString(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Find token odds (probability that target tokens appear)
Value findTokens(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Clear multinomial cache (useful for performance tests)

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

