#import <UIKit/UIKit.h>
#import "keep_awake.h"
#include <cstdio>

void chaos_odds_set_idle_timer_disabled(bool enabled) {
	fprintf(stderr, "[ChaosOdds] 🔋 chaos_odds_set_idle_timer_disabled called with enabled=%d (thread: %s)\n", 
		enabled ? 1 : 0, 
		[NSThread isMainThread] ? "main" : "background");
	fflush(stderr);
	
	// Always dispatch to main queue - this is the correct way to access UIApplication
	dispatch_async(dispatch_get_main_queue(), ^{
		UIApplication* app = [UIApplication sharedApplication];
		if (app) {
			[app setIdleTimerDisabled:enabled];
			fprintf(stderr, "[ChaosOdds] 🔋 setIdleTimerDisabled(%d) executed on main queue\n", enabled ? 1 : 0);
			fflush(stderr);
		} else {
			fprintf(stderr, "[ChaosOdds] ⚠️ UIApplication.sharedApplication is nil\n");
			fflush(stderr);
		}
	});
}


