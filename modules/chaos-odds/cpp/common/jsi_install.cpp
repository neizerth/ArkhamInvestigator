#include "jsi_install.h"
#include "jsi_functions.h"
#include <ReactCommon/CallInvoker.h>

namespace facebook {
namespace jsi {
namespace chaosodds {

void install(Runtime& runtime, std::shared_ptr<react::CallInvoker> jsInvoker) {
    // Set CallInvoker for async operations
    if (jsInvoker) {
        functions::setCallInvoker(jsInvoker);
    }
    auto chaosOdds = Object(runtime);
    
    // Install calculate function
    auto calculateFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "calculate"),
        1,
        [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
            return functions::calculate(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "calculate", calculateFunc);
    
    // Install cancel function
    auto cancelFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "cancel"),
        0,
        [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
            return functions::cancel(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "cancel", cancelFunc);
    
    // Install freeString function
    auto freeStringFunc = Function::createFromHostFunction(
        runtime,
        PropNameID::forAscii(runtime, "freeString"),
        1,
        [](Runtime& rt, const Value& thisValue, const Value* args, size_t count) -> Value {
            return functions::freeString(rt, thisValue, args, count);
        }
    );
    chaosOdds.setProperty(runtime, "freeString", freeStringFunc);
    
    runtime.global().setProperty(runtime, "ChaosOdds", chaosOdds);
}

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

