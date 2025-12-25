#include "jsi_functions.h"
#include "ffi_declarations.h"
#include "memory_manager.h"
#include "jsi_helpers.h"

#include <stdexcept>
#include <thread>
#include <memory>
#include <chrono>
#include <atomic>
#include <unordered_map>
#include <mutex>

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

// ============================================================================
// ID-based polling pattern (GC-safe, prevents use-after-free crashes)
// ============================================================================
// All async functions (calculate, findTokens, calculateItem) return task_id immediately.
// Rust calculations run in background threads. JS polls results via pollResult().
// This avoids storing jsi::Function objects across async boundaries, which caused
// EXC_BAD_ACCESS crashes when Runtime was destroyed (HMR, background, GC teardown).
// Key principle: C++ never stores jsi::Function/jsi::Object, only POD types between threads.

namespace {
    // Task status constants (match TypeScript enum)
    enum TaskStatus : uint8_t {
        TASK_STATUS_PENDING = 0,
        TASK_STATUS_COMPLETED = 1,
        TASK_STATUS_FAILED = 2,
        TASK_STATUS_CANCELLED = 3
    };
    
    // Task result storage - POD types only, no jsi::Function
    struct TaskResult {
        TaskStatus status;
        std::string result_str;  // JSON result string (only if COMPLETED) - copied from Rust, managed by C++
        std::chrono::steady_clock::time_point thread_start;
        int thread_id;
    };
    
    // Runtime lifecycle flag - CRITICAL for preventing use-after-free
    // This flag is set to true when JSI bindings are installed and false when Runtime is invalidated
    // pollResult checks this flag BEFORE creating any JSI objects to prevent EXC_BAD_ACCESS
    std::atomic<bool> g_runtime_alive{false};
    
    // Task storage: task_id -> TaskResult
    std::mutex g_task_storage_mutex;
    std::unordered_map<uint32_t, TaskResult> g_task_storage;
    std::atomic<uint32_t> g_next_task_id{1};
    
    // Track active background threads for debugging
    std::atomic<int> g_active_threads{0};
    std::atomic<int> g_total_threads_created{0};
    
    // Thread management: ensure only one calculation runs at a time
    // After cancel, give threads time to exit (non-blocking wait)
    void wait_for_cancel_effect(int ms = 50) {
        // Give cancelled threads time to check cancel flag and exit
        // Rust code checks cancel flag frequently, so this should be sufficient
        // Non-blocking: we don't wait for actual thread completion, just give time
        // for cancel flag to be checked
        std::this_thread::sleep_for(std::chrono::milliseconds(ms));
    }
    
    // C-compatible callback wrapper - called from Rust background thread
    // Stores result in task storage instead of calling JS callback
    extern "C" void chaos_odds_async_callback_wrapper(uint32_t task_id, const char* result_ptr) {
        std::lock_guard<std::mutex> lock(g_task_storage_mutex);
        auto it = g_task_storage.find(task_id);
        if (it == g_task_storage.end()) {
            LOGE("⏱️ [JSI] Async callback: task_id %u not found, ignoring", task_id);
            if (result_ptr != nullptr) {
                memory_free_string(result_ptr);
            }
            return;
        }
        
        auto& task = it->second;
        
        if (result_ptr == nullptr) {
            // Cancelled
            task.status = TASK_STATUS_CANCELLED;
            int active_after = g_active_threads.fetch_sub(1, std::memory_order_relaxed) - 1;
            auto thread_total = std::chrono::steady_clock::now() - task.thread_start;
            auto thread_total_ms = std::chrono::duration_cast<std::chrono::milliseconds>(thread_total).count();
            LOGI("⏱️ [JSI] Task #%u (thread #%d): cancelled, total time: %lld ms (active: %d)", task_id, task.thread_id, (long long)thread_total_ms, active_after);
        } else {
            // Completed successfully
            try {
                // Copy string immediately - this owns the data
                std::string result_str(result_ptr);
                // Free Rust memory immediately after copying - we don't need it anymore
                memory_free_string(result_ptr);
                result_ptr = nullptr; // Safety: mark as freed
                
                task.status = TASK_STATUS_COMPLETED;
                task.result_str = std::move(result_str);
                
                int active_after = g_active_threads.fetch_sub(1, std::memory_order_relaxed) - 1;
                auto thread_total = std::chrono::steady_clock::now() - task.thread_start;
                auto thread_total_ms = std::chrono::duration_cast<std::chrono::milliseconds>(thread_total).count();
                LOGI("⏱️ [JSI] Task #%u (thread #%d): completed successfully, total time: %lld ms (active: %d)", task_id, task.thread_id, (long long)thread_total_ms, active_after);
            } catch (...) {
                // Error copying string - free Rust memory
                if (result_ptr != nullptr) {
                    memory_free_string(result_ptr);
                }
                task.status = TASK_STATUS_FAILED;
                g_active_threads.fetch_sub(1, std::memory_order_relaxed);
                LOGE("⏱️ [JSI] Task #%u (thread #%d): failed to copy result string", task_id, task.thread_id);
            }
        }
    }
}

void setCallInvoker(std::shared_ptr<react::CallInvoker> jsInvoker) {
    // Deprecated: No longer used with ID-based polling pattern
    // Keeping for backwards compatibility but not storing it
    (void)jsInvoker;
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
        LOGI("⏱️ [JSI] JSON parse took %lld ms", (long long)jsi_parse_ms);
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    // If there's an error, throw exception (JS will catch it)
    if (!errorMessage.empty()) {
        throw std::runtime_error(errorMessage);
    }

    // Cancel any previous calculations and give threads time to exit
    int active_before_cancel = g_active_threads.load(std::memory_order_relaxed);
    if (active_before_cancel > 0) {
        LOGI("⏱️ [JSI] Cancelling %d previous calculation(s) before starting new one", active_before_cancel);
        chaos_odds_cancel();
        
        auto wait_start = std::chrono::steady_clock::now();
        const int max_wait_ms = 200;
        const int poll_interval_ms = 10;
        int waited_ms = 0;
        
        while (waited_ms < max_wait_ms) {
            int current_active = g_active_threads.load(std::memory_order_relaxed);
            if (current_active == 0) {
                break;
            }
            std::this_thread::sleep_for(std::chrono::milliseconds(poll_interval_ms));
            waited_ms += poll_interval_ms;
        }
        
        auto wait_duration = std::chrono::steady_clock::now() - wait_start;
        auto wait_total_ms = std::chrono::duration_cast<std::chrono::milliseconds>(wait_duration).count();
        LOGI("⏱️ [JSI] Cancel flag set, waited %lld ms for threads", (long long)wait_total_ms);
        
        chaos_odds_reset_cancel_flag();
        LOGI("⏱️ [JSI] Cancel flag reset - ready for new calculation");
    } else {
        chaos_odds_reset_cancel_flag();
    }

    // Create task and start calculation
    auto thread_start = std::chrono::steady_clock::now();
    int thread_id = g_total_threads_created.fetch_add(1, std::memory_order_relaxed) + 1;
    int active_before = g_active_threads.fetch_add(1, std::memory_order_relaxed);
    uint32_t task_id = g_next_task_id.fetch_add(1, std::memory_order_relaxed);
    
    // Store task in storage
    {
        std::lock_guard<std::mutex> lock(g_task_storage_mutex);
        g_task_storage[task_id] = {
            TASK_STATUS_PENDING,
            "",  // result_str
            thread_start,
            thread_id
        };
    }
    
    LOGI("⏱️ [JSI] Starting calculation #%d (task_id: %u, active: %d)", thread_id, task_id, active_before + 1);

    // Create C-compatible callback wrapper
    auto callback_wrapper = [](uint32_t task_id, const char* result_ptr) {
        chaos_odds_async_callback_wrapper(task_id, result_ptr);
    };

    // Call async Rust function - it spawns background thread and returns immediately
            std::string availableCopy = available;
    std::string revealedCopy = revealed;
    
    chaos_odds_calculate_async(
                                availableCopy.c_str(),
        revealedCopy.c_str(),
        task_id,
        callback_wrapper
    );
    
    LOGI("⏱️ [JSI] Calculation #%d (task_id: %u): chaos_odds_calculate_async() called, Rust background thread spawned", thread_id, task_id);

    // Return task_id
    return Value(static_cast<double>(task_id));
}

Value pollResult(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    // #region agent log
    FILE* log = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
    if (log) {
        fprintf(log, "{\"location\":\"jsi_functions.cpp:pollResult:entry\",\"message\":\"pollResult called\",\"data\":{\"count\":%zu},\"timestamp\":%lld}\n", count, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
        fclose(log);
    }
    // #endregion
    
    try {
        if (count < 1 || !arguments[0].isNumber()) {
            // #region agent log
            FILE* log2 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
            if (log2) {
                fprintf(log2, "{\"location\":\"jsi_functions.cpp:pollResult:invalid-args\",\"message\":\"invalid arguments\",\"data\":{\"count\":%zu},\"timestamp\":%lld}\n", count, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
                fclose(log2);
            }
            // #endregion
            return Value::null();
        }
        
        uint32_t task_id = static_cast<uint32_t>(arguments[0].asNumber());
        
        // #region agent log
        FILE* log3 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log3) {
            fprintf(log3, "{\"location\":\"jsi_functions.cpp:pollResult:before-lock\",\"message\":\"before lock, task_id=%u\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log3);
        }
        // #endregion
        
        TaskResult task_copy;
        bool task_found = false;
        
        {
            std::lock_guard<std::mutex> lock(g_task_storage_mutex);
            auto it = g_task_storage.find(task_id);
            if (it == g_task_storage.end()) {
                // #region agent log
                FILE* log4 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
                if (log4) {
                    fprintf(log4, "{\"location\":\"jsi_functions.cpp:pollResult:not-found\",\"message\":\"task not found\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
                    fclose(log4);
                }
                // #endregion
                return Value::null();
            }
            
            const auto& task = it->second;
            
            if (task.status == TASK_STATUS_PENDING) {
                // #region agent log
                FILE* log5 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
                if (log5) {
                    fprintf(log5, "{\"location\":\"jsi_functions.cpp:pollResult:pending\",\"message\":\"task still pending\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
                    fclose(log5);
                }
                // #endregion
                return Value::null();
            }
            
            // Copy task data before releasing lock
            task_copy = task;
            task_found = true;
            // DO NOT erase task here - erase it after successful return to prevent race conditions
            // if pollResult is called twice or React retries, the task should still be available
        }
        
        // CRITICAL: Check runtime lifecycle flag BEFORE creating any JSI objects
        // runtime.global() cannot reliably detect destroyed Runtime, so we use atomic flag
        if (!g_runtime_alive.load(std::memory_order_acquire)) {
            LOGE("⏱️ [JSI] pollResult: Runtime is not alive (destroyed/invalidated), returning null");
            return Value::null();
        }
        
        // #region agent log
        FILE* log6 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log6) {
            fprintf(log6, "{\"location\":\"jsi_functions.cpp:pollResult:after-lock\",\"message\":\"after lock, task copied\",\"data\":{\"task_id\":%u,\"status\":%d,\"result_str_len\":%zu},\"timestamp\":%lld}\n", task_id, (int)task_copy.status, task_copy.result_str.size(), (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log6);
        }
        // #endregion
        
        // #region agent log
        FILE* log9 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log9) {
            fprintf(log9, "{\"location\":\"jsi_functions.cpp:pollResult:before-object\",\"message\":\"before Object(runtime)\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log9);
        }
        // #endregion
        
        auto result_obj = Object(runtime);
        
        // #region agent log
        FILE* log10 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log10) {
            fprintf(log10, "{\"location\":\"jsi_functions.cpp:pollResult:after-object\",\"message\":\"after Object(runtime)\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log10);
        }
        // #endregion
        
        // #region agent log
        FILE* log11 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log11) {
            fprintf(log11, "{\"location\":\"jsi_functions.cpp:pollResult:before-setProperty-status\",\"message\":\"before setProperty status\",\"data\":{\"task_id\":%u,\"status_value\":%d},\"timestamp\":%lld}\n", task_id, (int)task_copy.status, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log11);
        }
        // #endregion
        
        result_obj.setProperty(runtime, "status", static_cast<double>(task_copy.status));
        
        // #region agent log
        FILE* log12 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log12) {
            fprintf(log12, "{\"location\":\"jsi_functions.cpp:pollResult:after-setProperty-status\",\"message\":\"after setProperty status\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log12);
        }
        // #endregion
        
        if (task_copy.status == TASK_STATUS_COMPLETED) {
            // Completed - include result string (no memory_id needed - string is owned by C++ std::string)
            // Create string safely
            try {
                // #region agent log
                FILE* log13 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
                if (log13) {
                    fprintf(log13, "{\"location\":\"jsi_functions.cpp:pollResult:before-createString\",\"message\":\"before String::createFromUtf8\",\"data\":{\"task_id\":%u,\"result_str_len\":%zu},\"timestamp\":%lld}\n", task_id, task_copy.result_str.size(), (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
                    fclose(log13);
                }
                // #endregion
                result_obj.setProperty(runtime, "result", String::createFromUtf8(runtime, task_copy.result_str));
                // #region agent log
                FILE* log14 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
                if (log14) {
                    fprintf(log14, "{\"location\":\"jsi_functions.cpp:pollResult:after-createString\",\"message\":\"after String::createFromUtf8\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
                    fclose(log14);
                }
                // #endregion
                    } catch (...) {
                // Failed to create string - return null
                LOGE("⏱️ [JSI] pollResult: Failed to create result string, returning null");
                // #region agent log
                FILE* log15 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
                if (log15) {
                    fprintf(log15, "{\"location\":\"jsi_functions.cpp:pollResult:createString-failed\",\"message\":\"String::createFromUtf8 failed\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
                    fclose(log15);
                }
                // #endregion
                return Value::null();
            }
        }
        
        // #region agent log
        FILE* log16 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log16) {
            fprintf(log16, "{\"location\":\"jsi_functions.cpp:pollResult:return\",\"message\":\"returning result object\",\"data\":{\"task_id\":%u},\"timestamp\":%lld}\n", task_id, (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log16);
        }
        // #endregion
        
        // Remove task from storage AFTER successful object creation
        // This prevents race conditions if pollResult is called multiple times
        // and ensures task is only removed after we successfully created and returned the result
        {
            std::lock_guard<std::mutex> lock(g_task_storage_mutex);
            g_task_storage.erase(task_id);
        }
        
        return Value(std::move(result_obj));
    } catch (const std::exception& e) {
        LOGE("⏱️ [JSI] pollResult: Exception: %s", e.what());
        // #region agent log
        FILE* log17 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log17) {
            fprintf(log17, "{\"location\":\"jsi_functions.cpp:pollResult:exception\",\"message\":\"exception caught\",\"data\":{\"what\":\"%s\"},\"timestamp\":%lld}\n", e.what(), (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log17);
        }
        // #endregion
        return Value::null();
    } catch (...) {
        LOGE("⏱️ [JSI] pollResult: Unknown exception");
        // #region agent log
        FILE* log18 = fopen("/Users/vy/Projects/Core/ArkhamInvestigator/.cursor/debug.log", "a");
        if (log18) {
            fprintf(log18, "{\"location\":\"jsi_functions.cpp:pollResult:unknown-exception\",\"message\":\"unknown exception caught\",\"timestamp\":%lld}\n", (long long)(std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count()));
            fclose(log18);
        }
        // #endregion
        return Value::null();
    }
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

// Runtime lifecycle management
void markRuntimeAlive() {
    g_runtime_alive.store(true, std::memory_order_release);
    LOGI("⏱️ [JSI] Runtime marked as alive");
}

void markRuntimeDead() {
    g_runtime_alive.store(false, std::memory_order_release);
    LOGI("⏱️ [JSI] Runtime marked as dead - clearing task storage");
    
    // Clear all tasks to prevent use-after-free
    std::lock_guard<std::mutex> lock(g_task_storage_mutex);
    g_task_storage.clear();
    LOGI("⏱️ [JSI] Task storage cleared");
}

// freeString removed - no longer needed with memory_id removal
// Strings are copied to std::string and managed by Hermes GC automatically

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

    // If there's an error, throw exception
    if (!errorMessage.empty()) {
        throw std::runtime_error(errorMessage);
    }

    // Cancel any previous calculations
    int active_before_cancel = g_active_threads.load(std::memory_order_relaxed);
    if (active_before_cancel > 0) {
        LOGI("⏱️ [JSI] findTokens: Cancelling %d previous calculation(s)", active_before_cancel);
        chaos_odds_cancel();
        wait_for_cancel_effect(50);
        chaos_odds_reset_cancel_flag();
    } else {
        chaos_odds_reset_cancel_flag();
    }

    // Create task and start calculation
    auto thread_start = std::chrono::steady_clock::now();
    int thread_id = g_total_threads_created.fetch_add(1, std::memory_order_relaxed) + 1;
    int active_before = g_active_threads.fetch_add(1, std::memory_order_relaxed);
    uint32_t task_id = g_next_task_id.fetch_add(1, std::memory_order_relaxed);
    
    // Store task in storage
    {
        std::lock_guard<std::mutex> lock(g_task_storage_mutex);
        g_task_storage[task_id] = {
            TASK_STATUS_PENDING,
            "",
            thread_start,
            thread_id
        };
    }
    
    LOGI("⏱️ [JSI] findTokens: Starting task #%d (task_id: %u, active: %d)", thread_id, task_id, active_before + 1);

            // Copy data for background thread
            std::string targetsCopy = targets;
            std::string tokensCopy = tokens;
            std::string paramsCopy = params;

            std::thread(
        [targetsCopy, tokensCopy, paramsCopy, task_id]() {
            try {
                const char* result_ptr = chaos_odds_find_tokens(
                                targetsCopy.c_str(),
                                tokensCopy.c_str(),
                                paramsCopy.c_str()
                            );

                // Store result in task storage (this will be called from C callback)
                chaos_odds_async_callback_wrapper(task_id, result_ptr);
            } catch (const std::exception& e) {
                // Store error in task storage
                std::lock_guard<std::mutex> lock(g_task_storage_mutex);
                auto it = g_task_storage.find(task_id);
                if (it != g_task_storage.end()) {
                    it->second.status = TASK_STATUS_FAILED;
                    g_active_threads.fetch_sub(1, std::memory_order_relaxed);
                }
            } catch (...) {
                std::lock_guard<std::mutex> lock(g_task_storage_mutex);
                auto it = g_task_storage.find(task_id);
                if (it != g_task_storage.end()) {
                    it->second.status = TASK_STATUS_FAILED;
                    g_active_threads.fetch_sub(1, std::memory_order_relaxed);
                }
            }
        }
    ).detach();

    return Value(static_cast<double>(task_id));
}

Value calculateItem(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    // Validate arguments and return rejected Promise on error
    std::string available;
    std::string revealed;
    uint16_t skill_value = 0;
    uint16_t difficulty = 0;
    std::string errorMessage;
    
    try {
        if (count < 4) {
            throw std::runtime_error("calculateItem() requires 4 arguments (available, revealed, skill_value, difficulty)");
        }
        
        if (!arguments[0].isString()) {
            throw std::runtime_error("calculateItem() first argument must be string (available JSON)");
        }
        if (!arguments[1].isString()) {
            throw std::runtime_error("calculateItem() second argument must be string (revealed JSON)");
        }
        if (!arguments[2].isNumber()) {
            throw std::runtime_error("calculateItem() third argument must be number (skill_value)");
        }
        if (!arguments[3].isNumber()) {
            throw std::runtime_error("calculateItem() fourth argument must be number (difficulty)");
        }
        
        available = arguments[0].asString(runtime).utf8(runtime);
        revealed = arguments[1].asString(runtime).utf8(runtime);
        skill_value = static_cast<uint16_t>(arguments[2].asNumber());
        difficulty = static_cast<uint16_t>(arguments[3].asNumber());
    } catch (const std::exception& e) {
        errorMessage = e.what();
    }

    // If there's an error, throw exception
    if (!errorMessage.empty()) {
        throw std::runtime_error(errorMessage);
    }

    // Cancel any previous calculations
    int active_before_cancel = g_active_threads.load(std::memory_order_relaxed);
    if (active_before_cancel > 0) {
        LOGI("⏱️ [JSI] calculateItem: Cancelling %d previous calculation(s)", active_before_cancel);
        chaos_odds_cancel();
        wait_for_cancel_effect(50);
        chaos_odds_reset_cancel_flag();
    } else {
        chaos_odds_reset_cancel_flag();
    }

    // Create task and start calculation
    auto thread_start = std::chrono::steady_clock::now();
    int thread_id = g_total_threads_created.fetch_add(1, std::memory_order_relaxed) + 1;
    int active_before = g_active_threads.fetch_add(1, std::memory_order_relaxed);
    uint32_t task_id = g_next_task_id.fetch_add(1, std::memory_order_relaxed);
    
    // Store task in storage
    {
        std::lock_guard<std::mutex> lock(g_task_storage_mutex);
        g_task_storage[task_id] = {
            TASK_STATUS_PENDING,
            "",
            thread_start,
            thread_id
        };
    }
    
    LOGI("⏱️ [JSI] calculateItem: Starting task #%d (task_id: %u, active: %d)", thread_id, task_id, active_before + 1);

    // Copy data for background thread
    std::string availableCopy = available;
    std::string revealedCopy = revealed;
    uint16_t skill_value_copy = skill_value;
    uint16_t difficulty_copy = difficulty;

    std::thread(
        [availableCopy, revealedCopy, skill_value_copy, difficulty_copy, task_id]() {
            try {
                const char* result_ptr = chaos_odds_calculate_item(
                    availableCopy.c_str(),
                    revealedCopy.c_str(),
                    skill_value_copy,
                    difficulty_copy
                );
                
                // Store result in task storage
                chaos_odds_async_callback_wrapper(task_id, result_ptr);
                    } catch (const std::exception& e) {
                // Store error in task storage
                std::lock_guard<std::mutex> lock(g_task_storage_mutex);
                auto it = g_task_storage.find(task_id);
                if (it != g_task_storage.end()) {
                    it->second.status = TASK_STATUS_FAILED;
                    g_active_threads.fetch_sub(1, std::memory_order_relaxed);
                        }
                    } catch (...) {
                std::lock_guard<std::mutex> lock(g_task_storage_mutex);
                auto it = g_task_storage.find(task_id);
                if (it != g_task_storage.end()) {
                    it->second.status = TASK_STATUS_FAILED;
                    g_active_threads.fetch_sub(1, std::memory_order_relaxed);
                        }
                    }
                }
            ).detach();

    return Value(static_cast<double>(task_id));
}

Value setKeepAwakeEnabled(
    Runtime& runtime,
    const Value& /*thisValue*/,
    const Value* arguments,
    size_t count
) {
    // Android doesn't have UIApplication, so this is a no-op
    // On iOS, this is handled by the iOS-specific implementation
    (void)runtime;
    (void)arguments;
    (void)count;
            return Value::undefined();
}

} // namespace functions
} // namespace chaosodds
} // namespace jsi
} // namespace facebook
