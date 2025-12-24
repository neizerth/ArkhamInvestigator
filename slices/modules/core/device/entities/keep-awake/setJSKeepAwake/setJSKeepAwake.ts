import { Platform } from "react-native";

let keepAliveTimer: NodeJS.Timeout | null = null;

export function startJSKeepAwake() {
	if (Platform.OS !== "ios") {
		return;
	}

	if (keepAliveTimer) return;

	keepAliveTimer = setInterval(() => {
		// Create a no-op promise to keep event loop active
		// Using .then() with empty callback prevents unnecessary work
		Promise.resolve().then(() => {});
	}, 17);
}

export function stopJSKeepAwake() {
	if (Platform.OS !== "ios") {
		return;
	}

	if (keepAliveTimer) {
		clearInterval(keepAliveTimer);
		keepAliveTimer = null;
	}
}
