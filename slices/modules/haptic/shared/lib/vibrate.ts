import { Platform, Vibration } from "react-native";

export const vibrate = (pattern: VibratePattern) => {
	if (Platform.OS !== "web") {
		Vibration.vibrate(pattern);
		return;
	}

	if ("vibrate" in navigator) {
		navigator.vibrate(pattern);
	}
};
