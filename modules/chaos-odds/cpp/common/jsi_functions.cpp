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
    // Validate arguments and return rejected Promise on error
    std::string available;
    std::string revealed;
    std::string errorMessage;
    
    try {
        helpers::validate_calculate_args(arguments, count);
        auto extracted = helpers::extract_strings(runtime, arguments, count);
        available = std::move(extracted.first);
        revealed  = std::move(extracted.second);
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    auto jsInvoker = g_jsInvoker;
    if (!jsInvoker && errorMessage.empty()) {
        errorMessage = "JS CallInvoker is not initialized";
    }
    
    // If there's an error, return rejected Promise
    if (!errorMessage.empty()) {
        auto promiseCtor = runtime.global().getPropertyAsFunction(runtime, "Promise");
        auto errorCtor = runtime.global().getPropertyAsFunction(runtime, "Error");
        std::string errorMsg = errorMessage;
        return promiseCtor.callAsConstructor(runtime, Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "reject"),
            2,
            [errorMsg](Runtime& rt, const Value&, const Value* args, size_t) -> Value {
                auto error = rt.global().getPropertyAsFunction(rt, "Error")
                    .callAsConstructor(rt, String::createFromUtf8(rt, errorMsg));
                args[1].getObject(rt).getFunction(rt).call(rt, error);
                return Value::undefined();
            }
        ));
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

            // Copy POD data for background thread
            std::string availableCopy = available;
            std::string revealedCopy  = revealed;

            std::thread(
                [availableCopy,
                 revealedCopy,
                 jsInvoker,
                 resolve,
                 reject]() {

                    try {
                        const char* result_ptr =
                            chaos_odds_calculate(
                                availableCopy.c_str(),
                                revealedCopy.c_str()
                            );

                        jsInvoker->invokeAsync(
                            [resolve, result_ptr](Runtime& runtime) {
                                if (result_ptr == nullptr) {
                                    resolve->call(runtime, Value::null());
                                    return;
                                }

                                std::string result_str(result_ptr);
                                uint64_t id =
                                    ::chaosodds::memory::generate_id();
                                ::chaosodds::memory::store_pointer(
                                    id,
                                    result_ptr
                                );

                                auto result_obj =
                                    helpers::create_result_object(
                                        runtime,
                                        id,
                                        result_str
                                    );

                                resolve->call(runtime, result_obj);
                            }
                        );
                    } catch (const std::exception& e) {
                        std::string msg = e.what();
                        jsInvoker->invokeAsync(
                            [reject, msg](Runtime& runtime) {
                                auto error_val = String::createFromUtf8(runtime, msg);
                                reject->call(runtime, error_val);
                            }
                        );
                    } catch (...) {
                        jsInvoker->invokeAsync(
                            [reject](Runtime& runtime) {
                                auto error_val = String::createFromUtf8(
                                    runtime,
                                    "Unknown error during chaos odds calculation"
                                );
                                reject->call(runtime, error_val);
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
    ::chaosodds::memory::free_pointer_by_id(id);

    return Value::undefined();
}

Value findTokens(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    // Validate arguments and return rejected Promise on error
    std::string targets;
    std::string tokens;
    std::string params;
    std::string errorMessage;
    
    try {
        if (count < 3) {
            throw std::runtime_error("findTokens() requires 3 arguments (targets, tokens, params)");
        }
        
        if (!arguments[0].isString()) {
            throw std::runtime_error("findTokens() first argument must be string (targets JSON)");
        }
        if (!arguments[1].isString()) {
            throw std::runtime_error("findTokens() second argument must be string (tokens JSON)");
        }
        if (!arguments[2].isString()) {
            throw std::runtime_error("findTokens() third argument must be string (params JSON)");
        }
        
        targets = arguments[0].asString(runtime).utf8(runtime);
        tokens = arguments[1].asString(runtime).utf8(runtime);
        params = arguments[2].asString(runtime).utf8(runtime);
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    auto jsInvoker = g_jsInvoker;
    if (!jsInvoker && errorMessage.empty()) {
        errorMessage = "JS CallInvoker is not initialized";
    }
    
    // If there's an error, return rejected Promise
    if (!errorMessage.empty()) {
        auto promiseCtor = runtime.global().getPropertyAsFunction(runtime, "Promise");
        std::string errorMsg = errorMessage;
        return promiseCtor.callAsConstructor(runtime, Function::createFromHostFunction(
            runtime,
            PropNameID::forAscii(runtime, "reject"),
            2,
            [errorMsg](Runtime& rt, const Value&, const Value* args, size_t) -> Value {
                auto error = rt.global().getPropertyAsFunction(rt, "Error")
                    .callAsConstructor(rt, String::createFromUtf8(rt, errorMsg));
                args[1].getObject(rt).getFunction(rt).call(rt, error);
                return Value::undefined();
            }
        ));
    }

    auto promiseCtor =
        runtime.global().getPropertyAsFunction(runtime, "Promise");

    auto executor = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "chaosOddsFindTokens"),
        2,
        [targets = std::move(targets),
         tokens = std::move(tokens),
         params = std::move(params),
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

            // Copy data for background thread
            std::string targetsCopy = targets;
            std::string tokensCopy = tokens;
            std::string paramsCopy = params;

            std::thread(
                [targetsCopy,
                 tokensCopy,
                 paramsCopy,
                 jsInvoker,
                 resolve,
                 reject]() {

                    try {
                        const char* result_ptr =
                            chaos_odds_find_tokens(
                                targetsCopy.c_str(),
                                tokensCopy.c_str(),
                                paramsCopy.c_str()
                            );

                        jsInvoker->invokeAsync(
                            [resolve, result_ptr](Runtime& runtime) {
                                if (result_ptr == nullptr) {
                                    resolve->call(runtime, Value::null());
                                    return;
                                }

                                std::string result_str(result_ptr);
                                uint64_t id =
                                    ::chaosodds::memory::generate_id();
                                ::chaosodds::memory::store_pointer(
                                    id,
                                    result_ptr
                                );

                                auto result_obj =
                                    helpers::create_result_object(
                                        runtime,
                                        id,
                                        result_str
                                    );

                                resolve->call(runtime, result_obj);
                            }
                        );
                    } catch (const std::exception& e) {
                        std::string msg = e.what();
                        jsInvoker->invokeAsync(
                            [reject, msg](Runtime& runtime) {
                                auto error_val = String::createFromUtf8(runtime, msg);
                                reject->call(runtime, error_val);
                            }
                        );
                    } catch (...) {
                        jsInvoker->invokeAsync(
                            [reject](Runtime& runtime) {
                                auto error_val = String::createFromUtf8(
                                    runtime,
                                    "Unknown error during token odds calculation"
                                );
                                reject->call(runtime, error_val);
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

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook
