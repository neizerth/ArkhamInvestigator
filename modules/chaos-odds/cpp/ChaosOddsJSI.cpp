#include "ChaosOddsJSI.h"
#include <stdexcept>

// Rust FFI declarations
extern "C" {
    uint64_t chaos_odds_add(uint64_t left, uint64_t right);
    double chaos_odds_count(const char* config);
}

namespace facebook {
namespace jsi {
namespace chaosodds {

void ChaosOddsJSI::install(jsi::Runtime& runtime) {
    // Create the global object
    auto chaosOdds = jsi::Object(runtime);
    
    // Install add function
    auto addFunc = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "add"),
        2,
        [](jsi::Runtime& rt,
           const jsi::Value& thisValue,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            return ChaosOddsJSI::add(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "add", addFunc);
    
    // Install count function
    auto countFunc = jsi::Function::createFromHostFunction(
        runtime,
        jsi::PropNameID::forAscii(runtime, "count"),
        1,
        [](jsi::Runtime& rt,
           const jsi::Value& thisValue,
           const jsi::Value* args,
           size_t count) -> jsi::Value {
            return ChaosOddsJSI::countTokens(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "count", countFunc);
    
    // Set global object
    runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
}

jsi::Value ChaosOddsJSI::add(
    jsi::Runtime& runtime,
    const jsi::Value& thisValue,
    const jsi::Value* arguments,
    size_t count
) {
    if (count < 2) {
        throw jsi::JSError(runtime, "add() requires 2 arguments");
    }
    
    if (!arguments[0].isNumber() || !arguments[1].isNumber()) {
        throw jsi::JSError(runtime, "add() requires numeric arguments");
    }
    
    uint64_t left = static_cast<uint64_t>(arguments[0].asNumber());
    uint64_t right = static_cast<uint64_t>(arguments[1].asNumber());
    
    uint64_t result = chaos_odds_add(left, right);
    
    return jsi::Value(static_cast<double>(result));
}

jsi::Value ChaosOddsJSI::countTokens(
    jsi::Runtime& runtime,
    const jsi::Value& thisValue,
    const jsi::Value* arguments,
    size_t count
) {
    if (count < 1) {
        throw jsi::JSError(runtime, "count() requires 1 argument");
    }
    
    if (!arguments[0].isString()) {
        throw jsi::JSError(runtime, "count() requires a string argument (JSON)");
    }
    
    std::string jsonStr = arguments[0].asString(runtime).utf8(runtime);
    
    double result = chaos_odds_count(jsonStr.c_str());
    
    return jsi::Value(result);
}

jsi::Value ChaosOddsJSI::calculate(
    jsi::Runtime& runtime,
    const jsi::Value& thisValue,
    const jsi::Value* arguments,
    size_t count
) {
    // Placeholder for future implementation
    throw jsi::JSError(runtime, "calculate() not yet implemented");
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

