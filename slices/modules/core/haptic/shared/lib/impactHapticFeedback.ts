import { Platform } from "react-native";
import { SHORT_VIBRATION, fallbackAndroid7Patterns } from "../config";
import type { HapticPatternType } from "../model";
import { Haptics } from "./Haptics";
import { vibrate } from "./vibrate";

const defaultHapticOptions = {
	enableVibrateFallback: true,
	ignoreAndroidSystemSettings: true,
};

const isAndroid7 = Platform.OS === "android" && Platform.Version < 26;

export const impactHapticFeedback = (
	value: HapticPatternType,
	hapticOptions = defaultHapticOptions,
) => {
	const isVibration = typeof value === "number" || Array.isArray(value);
	if (isVibration) {
		return vibrate(value);
	}

	if (isAndroid7) {
		const pattern = fallbackAndroid7Patterns[value] || SHORT_VIBRATION;
		return vibrate(pattern);
	}

	Haptics.trigger(value, hapticOptions);
};
