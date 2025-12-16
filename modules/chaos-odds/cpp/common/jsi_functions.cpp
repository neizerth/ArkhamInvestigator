#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"

#include <stdexcept>
#include <thread>
#include <memory>

#include <ReactCommon/CallInvoker.h>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

namespace {
    std::shared_ptr<react::CallInvoker> g_jsInvoker;
}

void setCallInvoker(std::shared_ptr<react::CallInvoker> jsInvoker) {
    g_jsInvoker = std::move(jsInvoker);
}

Value calculate(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    std::string available;
    std::string revealed;

    try {
        helpers::validate_calculate_args(arguments, count);
        auto extracted = helpers::extract_strings(runtime, arguments, count);
        available = std::move(extracted.first);
        revealed  = std::move(extracted.second);
    } catch (const std::exception& e) {
        throw JSError(runtime, e.what());
    }

    auto jsInvoker = g_jsInvoker;
    if (!jsInvoker) {
        throw JSError(runtime, "JS CallInvoker is not initialized");
    }

    auto promiseCtor =
        runtime.global().getPropertyAsFunction(runtime, "Promise");

    auto executor = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "chaosOddsCalculate"),
        2,
        [available = std::move(available),
         revealed  = std::move(revealed),
         jsInvoker](Runtime& rt,
                    const Value& /*thisValue*/,
                    const Value* args,
                    size_t /*count*/) -> Value {

            // Capture resolve / reject on JS thread
            auto resolve = std::make_shared<Function>(
                args[0].getObject(rt).getFunction(rt)
            );
            auto reject = std::make_shared<Function>(
                args[1].getObject(rt).getFunction(rt)
            );

            // Capture Runtime* for use inside invokeAsync (guaranteed JS thread)
            // Safe because invokeAsync guarantees execution on the same Runtime
            Runtime* runtime_ptr = &rt;

            // Copy POD data for background thread
            std::string availableCopy = available;
            std::string revealedCopy  = revealed;

            std::thread(
                [availableCopy,
                 revealedCopy,
                 jsInvoker,
                 resolve,
                 reject,
                 runtime_ptr]() {

                    try {
                        const char* result_ptr =
                            chaos_odds_calculate(
                                availableCopy.c_str(),
                                revealedCopy.c_str()
                            );

                        jsInvoker->invokeAsync(
                            [resolve, result_ptr, runtime_ptr]() {
                                if (result_ptr == nullptr) {
                                    resolve->call(*runtime_ptr, Value::null());
                                    return;
                                }

                                std::string result_str(result_ptr);
                                uint64_t id =
                                    chaosodds::memory::generate_id();
                                chaosodds::memory::store_pointer(
                                    id,
                                    result_ptr
                                );

                                auto result_obj =
                                    helpers::create_result_object(
                                        *runtime_ptr,
                                        id,
                                        result_str
                                    );

                                resolve->call(*runtime_ptr, result_obj);
                            }
                        );
                    } catch (const std::exception& e) {
                        std::string msg = e.what();
                        jsInvoker->invokeAsync(
                            [reject, msg, runtime_ptr]() {
                                auto error_val = String::createFromUtf8(*runtime_ptr, msg);
                                reject->call(*runtime_ptr, error_val);
                            }
                        );
                    } catch (...) {
                        jsInvoker->invokeAsync(
                            [reject, runtime_ptr]() {
                                auto error_val = String::createFromUtf8(
                                    *runtime_ptr,
                                    "Unknown error during chaos odds calculation"
                                );
                                reject->call(*runtime_ptr, error_val);
                            }
                        );
                    }
                }
            ).detach();

            return Value::undefined();
        }
    );

    return promiseCtor.callAsConstructor(runtime, executor);
}

Value cancel(
    Runtime&,
    const Value&,
    const Value*,
    size_t
) {
    chaos_odds_cancel();
    return Value::undefined();
}

Value freeString(
    Runtime& runtime,
    const Value&,
    const Value* arguments,
    size_t count
) {
    if (count < 1) {
        return Value::undefined();
    }

    uint64_t id =
        helpers::parse_id_from_value(runtime, arguments[0]);
    chaosodds::memory::free_pointer_by_id(id);

    return Value::undefined();
}

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook
