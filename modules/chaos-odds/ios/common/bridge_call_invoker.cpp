#include "bridge_call_invoker.h"
#include <dispatch/dispatch.h>
#include <cstring>

namespace facebook {
namespace react {

BridgeCallInvoker::BridgeCallInvoker(jsi::Runtime* runtime) : runtime_(runtime) {
}

BridgeCallInvoker::~BridgeCallInvoker() {
}

void BridgeCallInvoker::invokeAsync(CallFunc&& func) noexcept {
    if (!runtime_) {
        return;
    }
    
    jsi::Runtime* rt = runtime_;
    CallFunc capturedFunc = std::move(func);
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if (rt) {
            capturedFunc(*rt);
        }
    });
}

void BridgeCallInvoker::invokeSync(CallFunc&& func) {
    if (!runtime_) {
        return;
    }
    
    // For sync, check if we're already on main queue
    const char* currentLabel = dispatch_queue_get_label(DISPATCH_CURRENT_QUEUE_LABEL);
    const char* mainLabel = dispatch_queue_get_label(dispatch_get_main_queue());
    
    if (currentLabel && mainLabel && strcmp(currentLabel, mainLabel) == 0) {
        func(*runtime_);
    } else {
        dispatch_sync(dispatch_get_main_queue(), ^{
            func(*runtime_);
        });
    }
}

} // namespace react
} // namespace facebook

