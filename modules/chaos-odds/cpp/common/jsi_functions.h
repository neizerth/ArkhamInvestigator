#pragma once

#include <jsi/jsi.h>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

/// Calculate chaos bag odds
Value calculate(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Cancel ongoing calculation
Value cancel(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

/// Free memory allocated by calculate
Value freeString(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count);

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

