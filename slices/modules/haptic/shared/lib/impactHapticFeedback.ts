import type { HapticPatternType } from "../../shared/model";
import Haptics from "./Haptics";
import { vibrate } from "./vibrate";

const defaultHapticOptions = {
	enableVibrateFallback: true,
	ignoreAndroidSystemSettings: true,
};

export const impactHapticFeedback = (
	value: HapticPatternType,
	hapticOptions = defaultHapticOptions,
) => {
	const isVibration = typeof value === "number" || Array.isArray(value);
	if (isVibration) {
		return vibrate(value);
	}

	Haptics.trigger(value, hapticOptions);
};
