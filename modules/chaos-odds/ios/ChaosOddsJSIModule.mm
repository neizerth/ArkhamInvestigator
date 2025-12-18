#import "ChaosOddsJSIModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>
#import <ReactCommon/CallInvoker.h>
#import "ChaosOddsJSI.h"
#import "common/jsi_install.h"
#include <dispatch/dispatch.h>
#include <cstring>

using namespace facebook;

// CallInvoker implementation inline to avoid linking issues
// This CallInvoker gets the Runtime from the bridge when needed
namespace facebook {
namespace react {

class BridgeCallInvoker : public CallInvoker {
private:
    RCTCxxBridge* bridge_;
    
public:
    BridgeCallInvoker(RCTCxxBridge* bridge) : bridge_(bridge) {
    }
    
    virtual ~BridgeCallInvoker() {
    }
    
    void invokeAsync(CallFunc&& func) noexcept override {
        if (!bridge_ || !bridge_.runtime) {
            return;
        }
        
        // Capture bridge and function
        RCTCxxBridge* capturedBridge = bridge_;
        CallFunc capturedFunc = std::move(func);
        
        dispatch_async(dispatch_get_main_queue(), ^{
            if (capturedBridge && capturedBridge.runtime) {
                jsi::Runtime* rt = (jsi::Runtime*)capturedBridge.runtime;
                capturedFunc(*rt);
            }
        });
    }
    
    void invokeSync(CallFunc&& func) override {
        if (!bridge_ || !bridge_.runtime) {
            return;
        }
        
        jsi::Runtime* rt = (jsi::Runtime*)bridge_.runtime;
        
        // For sync, check if we're already on main queue
        const char* currentLabel = dispatch_queue_get_label(DISPATCH_CURRENT_QUEUE_LABEL);
        const char* mainLabel = dispatch_queue_get_label(dispatch_get_main_queue());
        
        if (currentLabel && mainLabel && strcmp(currentLabel, mainLabel) == 0) {
            func(*rt);
        } else {
            dispatch_sync(dispatch_get_main_queue(), ^{
                if (bridge_ && bridge_.runtime) {
                    jsi::Runtime* currentRt = (jsi::Runtime*)bridge_.runtime;
                    func(*currentRt);
                }
            });
        }
    }
};

} // namespace react
} // namespace facebook

@implementation ChaosOddsJSIModule

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

RCT_EXPORT_MODULE(ChaosOddsJSI)

+ (void)initialize {
    if (self == [ChaosOddsJSIModule class]) {
        NSLog(@"ChaosOddsJSIModule: Class initialized");
    }
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

// Dummy method to ensure module is accessible and gets initialized
RCT_EXPORT_METHOD(initialize)
{
    NSLog(@"ChaosOddsJSIModule: initialize method called");
    // The actual JSI installation happens in setBridge: and bridgeDidFinishLoading
}

- (void)installJSIBindings:(RCTBridge *)bridge {
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)bridge;
    if (!cxxBridge.runtime) {
        NSLog(@"ChaosOdds: Runtime not available yet");
        // Schedule installation for when runtime becomes available
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self installJSIBindings:bridge];
        });
        return;
    }
    
    jsi::Runtime& runtime = *(jsi::Runtime *)cxxBridge.runtime;
    
    NSLog(@"ChaosOdds: Installing JSI bindings");
    
    // Create a CallInvoker wrapper that dispatches to the main queue
    // Pass the bridge so it can get the current Runtime when needed
    std::shared_ptr<react::CallInvoker> jsInvoker = std::make_shared<react::BridgeCallInvoker>(cxxBridge);
    
    NSLog(@"ChaosOdds: CallInvoker wrapper created");
    
    // Call the install function with CallInvoker
    jsi::chaosodds::install(runtime, jsInvoker);
    NSLog(@"ChaosOdds: JSI bindings installed successfully");
}

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
    _methodQueue = dispatch_get_main_queue();
    
    NSLog(@"ChaosOddsJSIModule: setBridge called");
    
    // Try to install immediately
    [self installJSIBindings:bridge];
}

- (void)bridgeDidFinishLoading {
    NSLog(@"ChaosOddsJSIModule: bridgeDidFinishLoading called");
    // Also try installing when bridge finishes loading
    if (_bridge) {
        [self installJSIBindings:_bridge];
    }
}

- (void)invalidate {
    NSLog(@"ChaosOddsJSIModule: invalidate called");
    // Cleanup if needed
}

@end

