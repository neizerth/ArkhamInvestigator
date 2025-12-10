#include "ChaosOddsJSI.h"
#include <stdexcept>

// Rust FFI declarations
extern "C" {
    double chaos_odds_calculate(const char* available);
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
        throw jsi::JSError(runtime, "calculate() requires 1 argument (available)");
    }
    
    if (!arguments[0].isString()) {
        throw jsi::JSError(runtime, "calculate() requires string argument (JSON array)");
    }
    
    std::string available = arguments[0].asString(runtime).utf8(runtime);
    
    double result = chaos_odds_calculate(available.c_str());
    
    return jsi::Value(result);
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

