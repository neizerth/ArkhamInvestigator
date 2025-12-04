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

- (void)setBridge:(RCTBridge *)bridge {
    _bridge = bridge;
    _methodQueue = dispatch_get_main_queue();
    
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)bridge;
    if (!cxxBridge.runtime) {
        return;
    }
    
    jsi::Runtime& runtime = *(jsi::Runtime *)cxxBridge.runtime;
    
    // Install JSI bindings
    jsi::chaosodds::ChaosOddsJSI::install(runtime);
}

- (void)invalidate {
    // Cleanup if needed
}

@end

