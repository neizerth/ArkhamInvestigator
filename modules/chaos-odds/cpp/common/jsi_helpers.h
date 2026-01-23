#pragma once

#include <jsi/jsi.h>
#include <string>
#include <cstdint>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace helpers {

// ============================================================================
// Helper functions - SAFE: Only called from JS thread (synchronous pattern)
// ============================================================================
// These functions operate on Runtime and are ONLY invoked synchronously on the JS thread.
// No background threads, no async operations, no JSI objects stored across calls.

/// Parse ID from JSI value (accepts number or string for backwards compatibility)
uint64_t parse_id_from_value(Runtime& runtime, const Value& value);

/// Validate calculate arguments
void validate_calculate_args(const Value* arguments, size_t count);

/// Extract available and revealed strings from arguments
std::pair<std::string, std::string> extract_strings(Runtime& runtime, const Value* arguments, size_t count);

/// Create result object with id and result string
/// NOTE: Synchronous pattern - all operations on JS thread
Value create_result_object(Runtime& runtime, uint64_t id, const std::string& result);

} // namespace helpers
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

