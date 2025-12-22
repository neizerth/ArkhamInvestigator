import { Platform } from "react-native";

let keepAliveTimer: NodeJS.Timeout | null = null;

export function startJSKeepAwake() {
	if (Platform.OS !== "ios") {
		return;
	}

	if (keepAliveTimer) return;

	keepAliveTimer = setInterval(() => {
		Promise.resolve().then(() => 0);
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
