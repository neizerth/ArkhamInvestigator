#import "ChaosOddsJSIInstaller.h"
#import <React/RCTBridge+Private.h>
#import <jsi/jsi.h>
#import "ChaosOddsJSI.h"

using namespace facebook;

@implementation ChaosOddsJSIInstaller

+ (void)install:(RCTBridge *)bridge {
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)bridge;
    if (!cxxBridge.runtime) {
        NSLog(@"ChaosOdds: Runtime not available yet");
        // Schedule installation for when runtime becomes available
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self install:bridge];
        });
        return;
    }
    
    jsi::Runtime& runtime = *(jsi::Runtime *)cxxBridge.runtime;
    
    NSLog(@"ChaosOdds: Installing JSI bindings");
    jsi::chaosodds::ChaosOddsJSI::install(runtime);
    NSLog(@"ChaosOdds: JSI bindings installed successfully");
}

@end

