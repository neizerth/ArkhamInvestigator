#include "ChaosOddsJSI.h"
#include <stdexcept>

// Rust FFI declarations
extern "C" {
    const char* chaos_odds_calculate(const char* available, const char* revealed);
    void memory_free_string(const char* ptr);
}

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
    std::string result_str(result_ptr);
    memory_free_string(result_ptr);
    
    return jsi::Value(jsi::String::createFromUtf8(runtime, result_str));
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

