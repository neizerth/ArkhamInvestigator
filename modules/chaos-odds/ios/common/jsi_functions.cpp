#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"
#include <stdexcept>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

Value calculate(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count) {
    try {
        helpers::validate_calculate_args(arguments, count);
    } catch (const std::exception& e) {
        throw JSError(runtime, e.what());
    }
    
    auto [available, revealed] = helpers::extract_strings(runtime, arguments, count);
    
    const char* result_ptr = chaos_odds_calculate(available.c_str(), revealed.c_str());
    if (result_ptr == nullptr) {
        return Value::null();
    }
    
    std::string result_str(result_ptr);
    uint64_t id = ::chaosodds::memory::generate_id();
    ::chaosodds::memory::store_pointer(id, result_ptr);
    
    return helpers::create_result_object(runtime, id, result_str);
}

Value cancel(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count) {
    chaos_odds_cancel();
    return Value::undefined();
}

Value freeString(Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count) {
    if (count < 1) {
        return Value::undefined();
    }
    
    uint64_t id = helpers::parse_id_from_value(runtime, arguments[0]);
    ::chaosodds::memory::free_pointer_by_id(id);
    
    return Value::undefined();
}

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

