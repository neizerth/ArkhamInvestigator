#import "ChaosOddsJSIModule.h"
#import "ChaosOddsJSIInstaller.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>

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
    
    NSLog(@"ChaosOddsJSIModule: Installing JSI bindings");
    [ChaosOddsJSIInstaller install:bridge];
}

- (void)invalidate {
    // Cleanup if needed
}

@end

