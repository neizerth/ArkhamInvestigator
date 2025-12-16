#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"
#include <stdexcept>
#include <thread>
#include <mutex>
#include <queue>
#include <functional>
#include <memory>

namespace facebook {
namespace jsi {
namespace chaosodds {
namespace functions {

// Thread-safe task queue for scheduling JS callbacks from background threads
namespace {
    struct PendingCallback {
        std::function<void(Runtime&)> callback;
    };

    std::mutex callback_mutex;
    std::queue<std::unique_ptr<PendingCallback>> callback_queue;
    Runtime* g_runtime = nullptr;
    bool flush_scheduled = false;

    // Schedule a callback to be executed on the JS thread
    void schedule_callback(Runtime& runtime, std::function<void(Runtime&)> callback) {
        bool needs_flush = false;
        {
            std::lock_guard<std::mutex> lock(callback_mutex);
            auto task = std::make_unique<PendingCallback>();
            task->callback = std::move(callback);
            callback_queue.push(std::move(task));
            g_runtime = &runtime;
            
            // Schedule flush if not already scheduled
            if (!flush_scheduled) {
                flush_scheduled = true;
                needs_flush = true;
            }
        }
        
        // Schedule callback processing outside of lock
        if (needs_flush) {
            schedule_callback_flush(runtime);
        }
    }

    // Execute all pending callbacks (should be called from JS thread)
    void flush_callbacks(Runtime& runtime) {
        std::queue<std::unique_ptr<PendingCallback>> local_queue;
        {
            std::lock_guard<std::mutex> lock(callback_mutex);
            callback_queue.swap(local_queue);
            flush_scheduled = false; // Reset flag after processing
        }

        while (!local_queue.empty()) {
            auto task = std::move(local_queue.front());
            local_queue.pop();
            if (task && task->callback) {
                try {
                    task->callback(runtime);
                } catch (...) {
                    // Ignore errors in callbacks to prevent crashes
                }
            }
        }
        
        // If more callbacks were added while processing, schedule another flush
        {
            std::lock_guard<std::mutex> lock(callback_mutex);
            if (!callback_queue.empty() && !flush_scheduled && g_runtime) {
                flush_scheduled = true;
                schedule_callback_flush(*g_runtime);
            }
        }
    }

    // Schedule callback processing using setTimeout (safer than direct calls)
    void schedule_callback_flush(Runtime& runtime) {
        try {
            // Use setTimeout to schedule callback processing on JS thread
            auto setTimeout = runtime.global().getPropertyAsFunction(runtime, "setTimeout");
            
            // Create a one-time processor function
            auto processor = Function::createFromHostFunction(
                runtime,
                PropNameID::forAscii(runtime, "chaosOddsFlushCallbacks"),
                0,
                [](Runtime& rt, const Value& /*thisValue*/, const Value* /*args*/, size_t /*count*/) -> Value {
                    flush_callbacks(rt);
                    return Value::undefined();
                }
            );
            
            // Schedule immediate execution (0ms delay)
            setTimeout.call(runtime, processor, static_cast<double>(0));
        } catch (...) {
            // If setTimeout fails, try direct flush (less safe but better than nothing)
            flush_callbacks(runtime);
        }
    }
} // anonymous namespace

Value calculate(Runtime& runtime, const Value& /*thisValue*/, const Value* arguments, size_t count) {
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
        [available = std::move(available), revealed = std::move(revealed), &runtime](
            Runtime& rt, const Value& /*thisValue*/, const Value* args, size_t /*count*/) -> Value {
            auto resolve = args[0].getObject(rt).getFunction(rt);
            auto reject = args[1].getObject(rt).getFunction(rt);

            // Copy strings for thread safety
            std::string availableCopy = available;
            std::string revealedCopy = revealed;

            // Launch computation in a separate thread to avoid blocking Event Loop
            std::thread([availableCopy, revealedCopy, resolve, reject, &runtime]() mutable {
                try {
                    // Perform computation in background thread
                    const char* result_ptr = chaos_odds_calculate(availableCopy.c_str(), revealedCopy.c_str());

                    if (result_ptr == nullptr) {
                        // Schedule resolve callback on JS thread safely
                        schedule_callback(runtime, [resolve](Runtime& rt) mutable {
                            resolve.call(rt, Value::null());
                        });
                        return;
                    }

                    std::string result_str(result_ptr);
                    uint64_t id = chaosodds::memory::generate_id();
                    chaosodds::memory::store_pointer(id, result_ptr);

                    // Schedule resolve callback on JS thread safely
                    schedule_callback(runtime, [resolve, result_str, id](Runtime& rt) mutable {
                        auto result_obj = helpers::create_result_object(rt, id, result_str);
                        resolve.call(rt, result_obj);
                    });

                } catch (const std::exception& e) {
                    // Schedule reject callback on JS thread safely
                    std::string error_msg = e.what();
                    schedule_callback(runtime, [reject, error_msg](Runtime& rt) mutable {
                        reject.call(rt, String::createFromUtf8(rt, error_msg));
                    });
                } catch (...) {
                    // Schedule reject callback on JS thread safely
                    schedule_callback(runtime, [reject](Runtime& rt) mutable {
                        reject.call(rt, String::createFromUtf8(rt, "Unknown error during chaos odds calculation"));
                    });
                }
            }).detach(); // Detach thread - it will complete independently

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

