#include "ChaosOddsJSI.h"
#include <stdexcept>
#include <unordered_map>
#include <mutex>
#include <atomic>
#include <cstdint>

// Rust FFI declarations
extern "C" {
    const char* chaos_odds_calculate(const char* available, const char* revealed);
    void memory_free_string(const char* ptr);
    void chaos_odds_cancel();
}

// Map to store pointers returned from Rust for later freeing
// Key: unique ID (uint64_t)
// Value: original pointer from Rust
static std::unordered_map<uint64_t, const char*> g_string_pointers;
static std::mutex g_string_pointers_mutex;
static std::atomic<uint64_t> g_next_id{1}; // Start from 1, 0 is reserved for null/invalid

namespace facebook {
namespace jsi {
namespace chaosodds {

void ChaosOddsJSI::install(jsi::Runtime& runtime) {
    // Create the global object
    auto chaosOdds = jsi::Object(runtime);
    
    // Install calculate function
    auto calculateFunc = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "calculate"),
        1,
        [](jsi::Runtime& rt,
           const jsi::Value& thisValue,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            return ChaosOddsJSI::calculate(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "calculate", calculateFunc);
    
    // Install cancel function
    auto cancelFunc = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "cancel"),
        0,
        [](jsi::Runtime& rt,
           const jsi::Value& thisValue,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            return ChaosOddsJSI::cancel(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "cancel", cancelFunc);
    
    // Install freeString function
    auto freeStringFunc = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "freeString"),
        1,
        [](jsi::Runtime& rt,
           const jsi::Value& thisValue,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            return ChaosOddsJSI::freeString(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "freeString", freeStringFunc);
    
    // Set global object
    runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
}

jsi::Value ChaosOddsJSI::calculate(
    jsi::Runtime& runtime,
    const jsi::Value& thisValue,
    const jsi::Value* arguments,
    size_t count
) {
    if (count < 1) {
        throw jsi::JSError(runtime, "calculate() requires at least 1 argument (available)");
    }
    
    if (!arguments[0].isString()) {
        throw jsi::JSError(runtime, "calculate() requires string argument (JSON array)");
    }
    
    std::string available = arguments[0].asString(runtime).utf8(runtime);
    std::string revealed = "[]";
    if (count >= 2) {
        if (!arguments[1].isString()) {
            throw jsi::JSError(runtime, "calculate() second argument must be string (JSON array)");
        }
        revealed = arguments[1].asString(runtime).utf8(runtime);
    }
    
    const char* result_ptr = chaos_odds_calculate(available.c_str(), revealed.c_str());
    if (result_ptr == nullptr) {
        return jsi::Value::null();
    }
    
    // Copy the string to JavaScript string
    std::string result_str(result_ptr);
    
    // Generate unique ID for this pointer
    uint64_t id = g_next_id.fetch_add(1, std::memory_order_relaxed);
    
    // Store the pointer with unique ID for later freeing via freeString
    {
        std::lock_guard<std::mutex> lock(g_string_pointers_mutex);
        g_string_pointers[id] = result_ptr;
    }
    
    // Return object with id and result
    auto result_obj = jsi::Object(runtime);
    result_obj.setProperty(runtime, "id", static_cast<double>(id));
    result_obj.setProperty(runtime, "result", jsi::String::createFromUtf8(runtime, result_str));
    
    return jsi::Value(std::move(result_obj));
}

jsi::Value ChaosOddsJSI::cancel(
    jsi::Runtime& runtime,
    const jsi::Value& thisValue,
    const jsi::Value* arguments,
    size_t count
) {
    // Call Rust function to set cancellation flag
    chaos_odds_cancel();
    return jsi::Value::undefined();
}

jsi::Value ChaosOddsJSI::freeString(
    jsi::Runtime& runtime,
    const jsi::Value& thisValue,
    const jsi::Value* arguments,
    size_t count
) {
    if (count < 1) {
        // Invalid argument, but don't throw to avoid breaking existing code
        return jsi::Value::undefined();
    }
    
    // Accept both number (ID) and string (for backwards compatibility)
    uint64_t id = 0;
    if (arguments[0].isNumber()) {
        id = static_cast<uint64_t>(arguments[0].asNumber());
    } else if (arguments[0].isString()) {
        // Backwards compatibility: try to parse as number from string
        std::string id_str = arguments[0].asString(runtime).utf8(runtime);
        try {
            id = std::stoull(id_str);
        } catch (...) {
            // Invalid string, return early
            return jsi::Value::undefined();
        }
    } else {
        // Invalid type
        return jsi::Value::undefined();
    }
    
    if (id == 0) {
        // Invalid ID
        return jsi::Value::undefined();
    }
    
    // Find and free the stored pointer by ID
    {
        std::lock_guard<std::mutex> lock(g_string_pointers_mutex);
        auto it = g_string_pointers.find(id);
        if (it != g_string_pointers.end()) {
            const char* ptr = it->second;
            memory_free_string(ptr);
            g_string_pointers.erase(it);
        }
    }
    
    return jsi::Value::undefined();
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

