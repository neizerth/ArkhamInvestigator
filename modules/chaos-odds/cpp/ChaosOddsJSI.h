#pragma once

#include <jsi/jsi.h>
#include <memory>
#include <string>

namespace facebook {
namespace jsi {
namespace chaosodds {

class ChaosOddsJSI {
public:
    static void install(jsi::Runtime& runtime);
    
private:
    static jsi::Value add(
        jsi::Runtime& runtime,
        const jsi::Value& thisValue,
        const jsi::Value* arguments,
        size_t count
    );
    
    static jsi::Value countTokens(
        jsi::Runtime& runtime,
        const jsi::Value& thisValue,
        const jsi::Value* arguments,
        size_t count
    );
    
    static jsi::Value calculate(
        jsi::Runtime& runtime,
        const jsi::Value& thisValue,
        const jsi::Value* arguments,
        size_t count
    );
};

} // namespace chaosodds
} // namespace jsi
} // namespace facebook

