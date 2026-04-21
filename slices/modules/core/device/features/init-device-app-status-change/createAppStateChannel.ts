import { AppState, type AppStateStatus } from "react-native";
import { type EventChannel, eventChannel } from "redux-saga";

let activeSubscription: { remove: () => void } | null = null;

export function createAppStateChannel(): EventChannel<AppStateStatus> {
	// In dev with hot/fast refresh, module code can be re-executed while the old saga
	// instance is still alive, causing multiple AppState listeners to accumulate.
	// Keep only one active subscription at a time.
	if (activeSubscription) {
		activeSubscription.remove();
		activeSubscription = null;
	}

	return eventChannel((emit) => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			emit(nextAppState);
		});

		activeSubscription = subscription;

		return () => {
			if (activeSubscription === subscription) {
				activeSubscription = null;
			}
			subscription.remove();
		};
	});
}
