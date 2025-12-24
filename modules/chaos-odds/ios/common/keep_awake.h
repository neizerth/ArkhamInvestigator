#pragma once

#ifdef __cplusplus
extern "C" {
#endif

// Enable or disable the iOS idle timer (prevents device sleep while enabled).
// No-op on platforms where UIApplication is unavailable.
void chaos_odds_set_idle_timer_disabled(bool enabled);

#ifdef __cplusplus
}
#endif


