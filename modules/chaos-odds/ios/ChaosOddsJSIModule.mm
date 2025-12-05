#import "ChaosOddsJSIModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>
#import "ChaosOddsJSI.h"

using namespace facebook;

@implementation ChaosOddsJSIModule

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

RCT_EXPORT_MODULE(ChaosOddsJSI)

+ (BOOL)requiresMainQueueSetup {
    return YES;
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
    jsi::chaosodds::ChaosOddsJSI::install(runtime);
    NSLog(@"ChaosOdds: JSI bindings installed successfully");
}

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
    _methodQueue = dispatch_get_main_queue();
    
    NSLog(@"ChaosOddsJSIModule: Starting JSI installation");
    [self installJSIBindings:bridge];
}

- (void)invalidate {
    // Cleanup if needed
}

@end

