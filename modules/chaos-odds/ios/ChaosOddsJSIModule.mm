#import "ChaosOddsJSIModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>
#import <ReactCommon/CallInvoker.h>
#import "ChaosOddsJSI.h"
#import "common/jsi_install.h"
#include <dispatch/dispatch.h>
#include <cstring>
#include <chrono>

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
            NSLog(@"[ChaosOdds] invokeAsync: bridge or runtime is null, returning");
            return;
        }
        
        // Capture bridge and function
        RCTCxxBridge* capturedBridge = bridge_;
        CallFunc capturedFunc = std::move(func);
        
        auto dispatch_start = std::chrono::steady_clock::now();
        NSLog(@"[ChaosOdds] invokeAsync: dispatching to main queue");
        
        dispatch_async(dispatch_get_main_queue(), ^{
            auto dispatch_callback_start = std::chrono::steady_clock::now();
            auto dispatch_delay = std::chrono::duration_cast<std::chrono::milliseconds>(dispatch_callback_start - dispatch_start).count();
            NSLog(@"[ChaosOdds] invokeAsync: main queue callback executed after %lld ms delay", dispatch_delay);
            
            // Use C++ try-catch to catch both C++ and Objective-C exceptions
            try {
                NSLog(@"[ChaosOdds] invokeAsync: Checking bridge validity...");
                if (!capturedBridge) {
                    NSLog(@"[ChaosOdds ERROR] invokeAsync: capturedBridge is null");
                    return;
                }
                
                NSLog(@"[ChaosOdds] invokeAsync: Checking runtime validity...");
                if (!capturedBridge.runtime) {
                    NSLog(@"[ChaosOdds ERROR] invokeAsync: capturedBridge.runtime is null");
                    return;
                }
                
                NSLog(@"[ChaosOdds] invokeAsync: Casting runtime pointer...");
                jsi::Runtime* rt = (jsi::Runtime*)capturedBridge.runtime;
                if (!rt) {
                    NSLog(@"[ChaosOdds ERROR] invokeAsync: rt is null after cast");
                    return;
                }
                
                NSLog(@"[ChaosOdds] invokeAsync: About to call capturedFunc(*rt)...");
                // Wrap in try-catch to handle Runtime destruction
                // Use @try/@catch for Objective-C exceptions and nested try/catch for C++ exceptions
                @try {
                    try {
                        // Double-check runtime is still valid right before calling
                        if (!capturedBridge || !capturedBridge.runtime) {
                            NSLog(@"[ChaosOdds ERROR] invokeAsync: bridge or runtime became null before call");
                            return;
                        }
                        
                        // Get runtime pointer and validate it's accessible
                        jsi::Runtime* testRt = (jsi::Runtime*)capturedBridge.runtime;
                        if (!testRt) {
                            NSLog(@"[ChaosOdds ERROR] invokeAsync: testRt is null");
                            return;
                        }
                        
                        // Try to validate runtime is actually accessible
                        // Accessing global() will throw if runtime is invalid/destroyed
                        try {
                            auto testGlobal = testRt->global();
                            (void)testGlobal; // Suppress unused variable warning
                            NSLog(@"[ChaosOdds] invokeAsync: Runtime validation passed");
                        } catch (...) {
                            NSLog(@"[ChaosOdds ERROR] invokeAsync: Runtime validation failed (global() threw exception)");
                            return;
                        }
                        
                        NSLog(@"[ChaosOdds] invokeAsync: Calling capturedFunc(*rt) NOW...");
                        // Use testRt instead of rt to ensure we're using the validated pointer
                        // Final runtime validation immediately before call to prevent race condition
                        try {
                            testRt->global();
                        } catch (...) {
                            NSLog(@"[ChaosOdds ERROR] invokeAsync: Runtime became invalid between validation and call - aborting");
                            return;
                        }
                        capturedFunc(*testRt);
                        NSLog(@"[ChaosOdds] invokeAsync: capturedFunc(*rt) completed successfully");
                    } catch (const std::exception& e) {
                        NSLog(@"[ChaosOdds ERROR] invokeAsync func failed (C++ exception): %s", e.what());
                    } catch (...) {
                        NSLog(@"[ChaosOdds ERROR] invokeAsync func failed (C++ unknown exception)");
                    }
                } @catch (NSException *exception) {
                    NSLog(@"[ChaosOdds ERROR] invokeAsync func failed (Objective-C exception): %@, reason: %@", exception.name, exception.reason);
                }
            } catch (const std::exception& e) {
                // Runtime may have been destroyed (hot reload)
                NSLog(@"[ChaosOdds ERROR] invokeAsync failed: %s", e.what());
            } catch (...) {
                // Runtime may have been destroyed (hot reload)
                NSLog(@"[ChaosOdds ERROR] invokeAsync failed: unknown error");
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
    NSLog(@"ChaosOddsJSIModule: invalidate called - cleaning up JSI bindings");
    // Cleanup: cancel ongoing operations and clear CallInvoker to prevent use-after-free
    // This is critical during hot reload when the old Runtime is destroyed
    jsi::chaosodds::cleanup();
    _bridge = nil;
}

@end

