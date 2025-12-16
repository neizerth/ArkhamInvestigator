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
    std::string available;
    std::string revealed;

    try {
        helpers::validate_calculate_args(arguments, count);
        auto extracted = helpers::extract_strings(runtime, arguments, count);
        available = std::move(extracted.first);
        revealed = std::move(extracted.second);
    } catch (const std::exception& e) {
        throw JSError(runtime, e.what());
    }

    // Return a Promise so JS can await the result
    auto promiseConstructor = runtime.global().getPropertyAsFunction(runtime, "Promise");
    auto executor = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "chaosOddsCalculate"),
        2,
        [available = std::move(available), revealed = std::move(revealed)](Runtime& rt, const Value& /*thisValue*/, const Value* args, size_t /*count*/) -> Value {
            auto resolve = args[0].getObject(rt).getFunction(rt);
            auto reject = args[1].getObject(rt).getFunction(rt);

            try {
                const char* result_ptr = chaos_odds_calculate(available.c_str(), revealed.c_str());
                if (result_ptr == nullptr) {
                    resolve.call(rt, Value::null());
                    return Value::undefined();
                }

                std::string result_str(result_ptr);
                uint64_t id = chaosodds::memory::generate_id();
                chaosodds::memory::store_pointer(id, result_ptr);

                auto result_obj = helpers::create_result_object(rt, id, result_str);
                resolve.call(rt, result_obj);
            } catch (const std::exception& e) {
                reject.call(rt, String::createFromUtf8(rt, e.what()));
            } catch (...) {
                reject.call(rt, String::createFromUtf8(rt, "Unknown error during chaos odds calculation"));
            }

            return Value::undefined();
        }
    );

    return promiseConstructor.callAsConstructor(runtime, executor);
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
    chaosodds::memory::free_pointer_by_id(id);
    
    return Value::undefined();
}

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook

