#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"

#include <stdexcept>
#include <thread>
#include <memory>
#include <chrono>
#include <cstdio>

#include <ReactCommon/CallInvoker.h>

// iOS logging - use fprintf(stderr) for all threads
// fprintf(stderr) is thread-safe and works from any thread
// Logs will appear in Xcode console via stderr redirection

// Thread-safe logging macros for all threads
#define LOG_MAIN(...) do { fprintf(stderr, "[ChaosOdds] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); fflush(stderr); } while(0)
#define LOG_MAIN_ERROR(...) do { fprintf(stderr, "[ChaosOdds ERROR] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); fflush(stderr); } while(0)
#define LOG_BG(...) do { fprintf(stderr, "[ChaosOdds] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); fflush(stderr); } while(0)
#define LOG_BG_ERROR(...) do { fprintf(stderr, "[ChaosOdds ERROR] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n"); fflush(stderr); } while(0)

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

void clearCallInvoker() {
    // Cancel any ongoing operations first
    chaos_odds_cancel();
    // Clear the CallInvoker to prevent use-after-free during hot reload
    g_jsInvoker.reset();
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
            
            // Log when executor is called (Promise executor runs synchronously on JS thread)
            // Use fprintf instead of os_log to avoid thread-safety issues
            LOG_MAIN("Promise executor called - capturing resolve/reject");

            // Capture resolve / reject as Function
            // We store them as shared_ptr<Function> to safely pass between threads
            // The Function will be validated before use in invokeAsync callback
            auto resolveFunc = std::make_shared<Function>(
                args[0].getObject(rt).getFunction(rt)
            );
            auto rejectFunc = std::make_shared<Function>(
                args[1].getObject(rt).getFunction(rt)
            );
            
            LOG_MAIN("resolve/reject captured, starting background thread");

            // Copy POD data for background thread
            std::string availableCopy = available;
            std::string revealedCopy  = revealed;

            std::thread(
                [availableCopy,
                 revealedCopy,
                 jsInvoker,
                 resolveFunc,
                 rejectFunc]() {
                    // Use thread-safe logging for background thread
                    LOG_BG("Background thread started, calling chaos_odds_calculate");
                    
                    try {
                        auto calc_start = std::chrono::steady_clock::now();
                        const char* result_ptr =
                            chaos_odds_calculate(
                                availableCopy.c_str(),
                                revealedCopy.c_str()
                            );
                        auto calc_end = std::chrono::steady_clock::now();
                        auto calc_duration = std::chrono::duration_cast<std::chrono::milliseconds>(calc_end - calc_start).count();
                        LOG_BG("chaos_odds_calculate completed in %lld ms", calc_duration);

                        if (!jsInvoker) {
                            // If jsInvoker is null, we can't call back - this shouldn't happen
                            // but we need to free the pointer if it was allocated
                            if (result_ptr != nullptr) {
                                memory_free_string(result_ptr);
                            }
                            return;
                        }

                        auto invoke_start = std::chrono::steady_clock::now();
                        LOG_BG("Preparing to resolve promise - copying result string");
                        
                        // Copy the string immediately on background thread to avoid issues
                        std::string result_str;
                        if (result_ptr != nullptr) {
                            try {
                                result_str = std::string(result_ptr);
                            } catch (...) {
                                // If copying fails, free pointer and return null
                                memory_free_string(result_ptr);
                                LOG_BG_ERROR("Failed to copy result string");
                                if (jsInvoker) {
                                    jsInvoker->invokeAsync(
                                        [resolveFunc](Runtime& runtime) {
                                            if (resolveFunc) {
                                                try {
                                                    resolveFunc->call(runtime, Value::null());
                                                } catch (...) {
                                                    // Runtime may have been destroyed
                                                }
                                            }
                                        }
                                    );
                                }
                                return;
                            }
                        }
                        
                        // Generate ID and store pointer before invoking
                        uint64_t id = 0;
                        if (result_ptr != nullptr) {
                            id = ::chaosodds::memory::generate_id();
                            ::chaosodds::memory::store_pointer(id, result_ptr);
                        }
                        
                        LOG_BG("Calling jsInvoker->invokeAsync to resolve promise");
                        
                        jsInvoker->invokeAsync(
                            [resolveFunc, result_str, id, invoke_start](Runtime& runtime) {
                                // This callback runs on main thread, but use fprintf for consistency
                                LOG_MAIN("=== invokeAsync lambda START ===");
                                auto invoke_callback_start = std::chrono::steady_clock::now();
                                auto invoke_delay = std::chrono::duration_cast<std::chrono::milliseconds>(invoke_callback_start - invoke_start).count();
                                LOG_MAIN("invokeAsync callback executed after %lld ms delay", invoke_delay);
                                
                                // Validate resolveFunc before using it
                                LOG_MAIN("Checking resolveFunc validity...");
                                if (!resolveFunc) {
                                    LOG_MAIN_ERROR("resolveFunc is null");
                                    return;
                                }
                                
                                LOG_MAIN("resolveFunc is valid, proceeding with result object creation");
                                LOG_MAIN("result_str size: %zu bytes", result_str.size());
                                
                                // Validate runtime before using it - try to access global object
                                // This is a safety check - if runtime is destroyed, accessing global() will crash
                                try {
                                    LOG_MAIN("Validating runtime by accessing global object...");
                                    auto globalObj = runtime.global();
                                    (void)globalObj; // Suppress unused variable warning
                                    LOG_MAIN("Runtime validation passed (global() accessible)");
                                } catch (const std::exception& e) {
                                    LOG_MAIN_ERROR("Runtime validation failed (exception): %s", e.what());
                                    return;
                                } catch (...) {
                                    LOG_MAIN_ERROR("Runtime is invalid or destroyed, aborting callback");
                                    return;
                                }
                                
                                try {
                                    // Create result object - this may throw if Runtime is invalid
                                    auto create_obj_start = std::chrono::steady_clock::now();
                                    LOG_MAIN("About to call create_result_object...");
                                    LOG_MAIN("Runtime pointer: %p", &runtime);
                                    
                                    auto result_obj =
                                        helpers::create_result_object(
                                            runtime,
                                            id,
                                            result_str
                                        );
                                    
                                    LOG_MAIN("create_result_object returned, checking result...");
                                    auto create_obj_duration = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - create_obj_start).count();
                                    LOG_MAIN("create_result_object took %lld ms", create_obj_duration);

                                    // Check if result object is valid (null indicates Runtime was destroyed)
                                    if (result_obj.isNull() || result_obj.isUndefined()) {
                                        LOG_MAIN("result_obj is null/undefined, returning");
                                        return;
                                    }

                                    // Call resolve - this may throw if Runtime is invalid
                                    auto resolve_call_start = std::chrono::steady_clock::now();
                                    LOG_MAIN("About to call resolveFunc->call() with result_obj");
                                    
                                    // Log result object details before calling resolve
                                    if (result_obj.isObject()) {
                                        LOG_MAIN("result_obj is valid Object");
                                    } else {
                                        LOG_MAIN("result_obj is NOT an Object (isNull=%d, isUndefined=%d)", 
                                               result_obj.isNull(), result_obj.isUndefined());
                                    }
                                    
                                    LOG_MAIN("Calling resolveFunc->call() NOW - this may crash if Runtime is invalid");
                                    LOG_MAIN("resolveFunc pointer: %p", resolveFunc.get());
                                    LOG_MAIN("Runtime pointer before call: %p", &runtime);
                                    
                                    // Double-check Runtime is still valid right before calling resolveFunc
                                    // Accessing global() will throw/crash if Runtime is destroyed
                                    try {
                                        auto test_global = runtime.global();
                                        (void)test_global; // Suppress unused variable warning
                                    } catch (...) {
                                        LOG_MAIN_ERROR("Runtime validation failed immediately before resolveFunc->call() - Runtime may be destroyed");
                                        fflush(stderr);
                                        return;
                                    }
                                    
                                    auto before_resolve = std::chrono::steady_clock::now();
                                    
                                    // CRITICAL: Wrap resolveFunc->call() in additional try-catch
                                    // to catch any exceptions that might occur during the call
                                    try {
                                        LOG_MAIN("About to execute resolveFunc->call()...");
                                        fflush(stderr); // Force flush before potentially crashing call
                                        
                                        // Additional safety check: ensure resolveFunc is not null
                                        if (!resolveFunc) {
                                            LOG_MAIN_ERROR("resolveFunc is null right before call()");
                                            fflush(stderr);
                                            return;
                                        }
                                        
                                        // Final runtime validation immediately before call
                                        // Use a simple operation that will fail if runtime is destroyed
                                        try {
                                            runtime.global();
                                        } catch (...) {
                                            LOG_MAIN_ERROR("Runtime validation failed immediately before resolveFunc->call() - aborting");
                                            fflush(stderr);
                                            return;
                                        }
                                        
                                        resolveFunc->call(runtime, result_obj);
                                        LOG_MAIN("resolveFunc->call() returned successfully");
                                        fflush(stderr); // Force flush after call
                                        auto after_resolve = std::chrono::steady_clock::now();
                                        auto resolve_call_duration = std::chrono::duration_cast<std::chrono::milliseconds>(after_resolve - resolve_call_start).count();
                                        auto resolve_call_internal_duration = std::chrono::duration_cast<std::chrono::milliseconds>(after_resolve - before_resolve).count();
                                        LOG_MAIN("resolveFunc->call() completed in %lld ms (internal: %lld ms) - Promise should now be resolved", resolve_call_duration, resolve_call_internal_duration);
                                    } catch (const std::exception& e) {
                                        LOG_MAIN_ERROR("resolveFunc->call() threw exception: %s", e.what());
                                        fflush(stderr);
                                        // Don't rethrow - just log and return
                                        return;
                                    } catch (...) {
                                        LOG_MAIN_ERROR("resolveFunc->call() threw unknown exception");
                                        fflush(stderr);
                                        // Don't rethrow - just log and return
                                        return;
                                    }
                                    
                                    LOG_MAIN("resolveFunc->call() finished, Promise resolution should be queued");
                                    
                                    // Note: We cannot use setTimeout or queueMicrotask here to force event loop processing
                                    // because JSI Functions created via Function::createFromHostFunction have memory lifecycle issues
                                    // when passed to native JS functions. Promise resolution handlers will be processed
                                    // when the event loop naturally processes microtasks (typically after UI interactions).
                                    LOG_MAIN("=== invokeAsync lambda END ===");
                                } catch (const std::exception& e) {
                                    // Runtime may have been destroyed (hot reload)
                                    LOG_MAIN_ERROR("Failed to call resolve: %s", e.what());
                                } catch (...) {
                                    // Runtime may have been destroyed (hot reload)
                                    LOG_MAIN_ERROR("Failed to call resolve: unknown error");
                                }
                            }
                        );
                    } catch (const std::exception& e) {
                        // Use thread-safe logging for background thread
                        std::string msg = e.what();
                        LOG_BG_ERROR("Exception in background thread: %s", msg.c_str());
                        if (jsInvoker && rejectFunc) {
                            jsInvoker->invokeAsync(
                                [rejectFunc, msg](Runtime& runtime) {
                                    try {
                                        if (!rejectFunc) {
                                            return;
                                        }
                                        auto error_val = String::createFromUtf8(runtime, msg);
                                        rejectFunc->call(runtime, error_val);
                                    } catch (...) {
                                        // Runtime may have been destroyed
                                    }
                                }
                            );
                        }
                    } catch (...) {
                        // Use thread-safe logging for background thread
                        LOG_BG_ERROR("Unknown exception in background thread");
                        if (jsInvoker && rejectFunc) {
                            jsInvoker->invokeAsync(
                                [rejectFunc](Runtime& runtime) {
                                    try {
                                        if (!rejectFunc) {
                                            return;
                                        }
                                        auto error_val = String::createFromUtf8(
                                            runtime,
                                            "Unknown error during chaos odds calculation"
                                        );
                                        rejectFunc->call(runtime, error_val);
                                    } catch (...) {
                                        // Runtime may have been destroyed
                                    }
                                }
                            );
                        }
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
    auto free_start = std::chrono::steady_clock::now();
    LOG_MAIN("freeString called");
    
    if (count < 1) {
        LOG_MAIN("freeString: no arguments, returning");
        return Value::undefined();
    }

    uint64_t id =
        helpers::parse_id_from_value(runtime, arguments[0]);
    LOG_MAIN("freeString: freeing pointer with id=%llu", id);
    
    ::chaosodds::memory::free_pointer_by_id(id);
    
    auto free_duration = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - free_start).count();
    LOG_MAIN("freeString completed in %lld ms", free_duration);

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

                        if (!jsInvoker) {
                            // If jsInvoker is null, we can't call back - this shouldn't happen
                            // but we need to free the pointer if it was allocated
                            if (result_ptr != nullptr) {
                                memory_free_string(result_ptr);
                            }
                            return;
                        }

                        jsInvoker->invokeAsync(
                            [resolve, result_ptr](Runtime& runtime) {
                                if (!resolve) {
                                    // Free pointer if resolve is null
                                    if (result_ptr != nullptr) {
                                        memory_free_string(result_ptr);
                                    }
                                    return;
                                }
                                
                                if (result_ptr == nullptr) {
                                    resolve->call(runtime, Value::null());
                                    return;
                                }

                                // Copy the string immediately to avoid issues if pointer becomes invalid
                                // Validate pointer before copying with try-catch
                                std::string result_str;
                                try {
                                    result_str = std::string(result_ptr);
                                } catch (...) {
                                    // If copying fails, free pointer and return null
                                    memory_free_string(result_ptr);
                                    resolve->call(runtime, Value::null());
                                    return;
                                }
                                
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
                        if (jsInvoker) {
                            jsInvoker->invokeAsync(
                                [reject, msg](Runtime& runtime) {
                                    if (!reject) {
                                        return;
                                    }
                                    auto error_val = String::createFromUtf8(runtime, msg);
                                    reject->call(runtime, error_val);
                                }
                            );
                        }
                    } catch (...) {
                        if (jsInvoker) {
                            jsInvoker->invokeAsync(
                                [reject](Runtime& runtime) {
                                    if (!reject) {
                                        return;
                                    }
                                    auto error_val = String::createFromUtf8(
                                        runtime,
                                        "Unknown error during token odds calculation"
                                    );
                                    reject->call(runtime, error_val);
                                }
                            );
                        }
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
