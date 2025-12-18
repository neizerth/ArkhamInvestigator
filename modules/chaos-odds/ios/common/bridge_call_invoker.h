#pragma once

#include <ReactCommon/CallInvoker.h>
#include <functional>
#include <memory>
#include <jsi/jsi.h>

namespace facebook {
namespace react {

class BridgeCallInvoker : public CallInvoker {
private:
    jsi::Runtime* runtime_;
    
public:
    BridgeCallInvoker(jsi::Runtime* runtime);
    virtual ~BridgeCallInvoker();
    
    // Implement the pure virtual methods
    void invokeAsync(CallFunc&& func) noexcept override;
    void invokeSync(CallFunc&& func) override;
};

} // namespace react
} // namespace facebook

