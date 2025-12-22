#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"

#include <stdexcept>
#include <thread>
#include <memory>
#include <chrono>
#include <atomic>

#include <ReactCommon/CallInvoker.h>

#ifdef __ANDROID__
#include <android/log.h>
#define LOG_TAG "ChaosOdds"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)
#else
#include <cstdio>
#define LOGI(...) fprintf(stderr, "[ChaosOdds] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n")
#define LOGE(...) fprintf(stderr, "[ChaosOdds ERROR] "); fprintf(stderr, __VA_ARGS__); fprintf(stderr, "\n")
#endif

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

namespace {
    std::shared_ptr<react::CallInvoker> g_jsInvoker;
    // Track active background threads for debugging
    std::atomic<int> g_active_threads{0};
    std::atomic<int> g_total_threads_created{0};
    std::atomic<int> g_pending_invoke_async{0};
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
    auto jsi_start = std::chrono::steady_clock::now();
    LOGI("⏱️ [JSI] calculate() called");
    
    // Validate arguments and return rejected Promise on error
    std::string available;
    std::string revealed;
    std::string errorMessage;
    
    try {
        helpers::validate_calculate_args(arguments, count);
        auto extracted = helpers::extract_strings(runtime, arguments, count);
        available = std::move(extracted.first);
        revealed  = std::move(extracted.second);
        auto jsi_parse_end = std::chrono::steady_clock::now();
        auto jsi_parse_ms = std::chrono::duration_cast<std::chrono::milliseconds>(jsi_parse_end - jsi_start).count();
        LOGI("⏱️ [JSI] JSON parse took %ld ms", jsi_parse_ms);
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

    // Cancel any previous calculations to prevent accumulation of threads
    // This is critical for performance - multiple simultaneous Rust calculations
    // create their own Rayon thread pools, causing severe performance degradation
    int active_before_cancel = g_active_threads.load(std::memory_order_relaxed);
    if (active_before_cancel > 0) {
        LOGI("⏱️ [JSI] Cancelling %d previous calculation(s) before starting new one", active_before_cancel);
        chaos_odds_cancel();
    }

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
            
            auto thread_start = std::chrono::steady_clock::now();
            int thread_id = g_total_threads_created.fetch_add(1, std::memory_order_relaxed) + 1;
            int active_before = g_active_threads.fetch_add(1, std::memory_order_relaxed);
            LOGI("⏱️ [JSI] Starting background thread #%d (active: %d)", thread_id, active_before + 1);

            std::thread(
                [availableCopy,
                 revealedCopy,
                 jsInvoker,
                 resolve,
                 reject,
                 thread_start,
                 thread_id]() {
                    auto thread_delay = std::chrono::steady_clock::now() - thread_start;
                    auto thread_delay_ms = std::chrono::duration_cast<std::chrono::milliseconds>(thread_delay).count();
                    LOGI("⏱️ [JSI] Background thread #%d: started after %ld ms delay, calling chaos_odds_calculate()", thread_id, thread_delay_ms);
                    
                    auto rust_start = std::chrono::steady_clock::now();
                    
                    try {
                        const char* result_ptr =
                            chaos_odds_calculate(
                                availableCopy.c_str(),
                                revealedCopy.c_str()
                            );
                        
                        auto rust_end = std::chrono::steady_clock::now();
                        auto rust_ms = std::chrono::duration_cast<std::chrono::milliseconds>(rust_end - rust_start).count();
                        LOGI("⏱️ [JSI] chaos_odds_calculate() returned in %ld ms", rust_ms);

                        if (!jsInvoker) {
                            // If jsInvoker is null, we can't call back - this shouldn't happen
                            // but we need to free the pointer if it was allocated
                            if (result_ptr != nullptr) {
                                memory_free_string(result_ptr);
                            }
                            return;
                        }

                        auto invoke_start = std::chrono::steady_clock::now();
                        int pending_before = g_pending_invoke_async.fetch_add(1, std::memory_order_relaxed);
                        LOGI("⏱️ [JSI] Thread #%d: Calling invokeAsync() (pending: %d)", thread_id, pending_before + 1);
                        
                        jsInvoker->invokeAsync(
                            [resolve, result_ptr, invoke_start, thread_id](Runtime& runtime) {
                                auto callback_start = std::chrono::steady_clock::now();
                                auto invoke_wait_ms = std::chrono::duration_cast<std::chrono::milliseconds>(callback_start - invoke_start).count();
                                int pending_after = g_pending_invoke_async.fetch_sub(1, std::memory_order_relaxed) - 1;
                                LOGI("⏱️ [JSI] Thread #%d: invokeAsync callback executed after %ld ms wait (pending: %d)", thread_id, invoke_wait_ms, pending_after);
                                
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
                                auto copy_start = std::chrono::steady_clock::now();
                                std::string result_str;
                                try {
                                    result_str = std::string(result_ptr);
                                } catch (...) {
                                    // If copying fails, free pointer and return null
                                    memory_free_string(result_ptr);
                                    resolve->call(runtime, Value::null());
                                    return;
                                }
                                auto copy_end = std::chrono::steady_clock::now();
                                auto copy_ms = std::chrono::duration_cast<std::chrono::milliseconds>(copy_end - copy_start).count();
                                LOGI("⏱️ [JSI] String copy took %ld ms (size=%zu)", copy_ms, result_str.size());
                                
                                uint64_t id =
                                    ::chaosodds::memory::generate_id();
                                ::chaosodds::memory::store_pointer(
                                    id,
                                    result_ptr
                                );

                                auto obj_start = std::chrono::steady_clock::now();
                                auto result_obj =
                                    helpers::create_result_object(
                                        runtime,
                                        id,
                                        result_str
                                    );
                                auto obj_end = std::chrono::steady_clock::now();
                                auto obj_ms = std::chrono::duration_cast<std::chrono::milliseconds>(obj_end - obj_start).count();
                                LOGI("⏱️ [JSI] Thread #%d: create_result_object took %ld ms", thread_id, obj_ms);

                                auto resolve_start = std::chrono::steady_clock::now();
                                resolve->call(runtime, result_obj);
                                auto resolve_end = std::chrono::steady_clock::now();
                                auto resolve_ms = std::chrono::duration_cast<std::chrono::milliseconds>(resolve_end - resolve_start).count();
                                LOGI("⏱️ [JSI] Thread #%d: resolve->call() took %ld ms", thread_id, resolve_ms);
                            }
                        );
                        
                        // Decrement active thread counter when thread completes
                        int active_after = g_active_threads.fetch_sub(1, std::memory_order_relaxed) - 1;
                        auto thread_total = std::chrono::steady_clock::now() - thread_start;
                        auto thread_total_ms = std::chrono::duration_cast<std::chrono::milliseconds>(thread_total).count();
                        LOGI("⏱️ [JSI] Thread #%d: completed, total time: %ld ms (active: %d)", thread_id, thread_total_ms, active_after);
                    } catch (const std::exception& e) {
                        std::string msg = e.what();
                        LOGE("⏱️ [JSI] Thread #%d: Exception: %s", thread_id, msg.c_str());
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
                        // Decrement active thread counter on error
                        int active_after = g_active_threads.fetch_sub(1, std::memory_order_relaxed) - 1;
                        LOGI("⏱️ [JSI] Thread #%d: error completed (active: %d)", thread_id, active_after);
                    } catch (...) {
                        LOGE("⏱️ [JSI] Thread #%d: Unknown exception", thread_id);
                        if (jsInvoker) {
                            jsInvoker->invokeAsync(
                                [reject](Runtime& runtime) {
                                    if (!reject) {
                                        return;
                                    }
                                    auto error_val = String::createFromUtf8(
                                        runtime,
                                        "Unknown error during chaos odds calculation"
                                    );
                                    reject->call(runtime, error_val);
                                }
                            );
                        }
                        // Decrement active thread counter on error
                        int active_after = g_active_threads.fetch_sub(1, std::memory_order_relaxed) - 1;
                        LOGI("⏱️ [JSI] Thread #%d: error completed (active: %d)", thread_id, active_after);
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
