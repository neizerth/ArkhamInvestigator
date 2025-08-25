import type { HapticOptions } from "react-native-haptic-feedback";
import { TICK_PATTERN, fallbackWebPatterns } from "../../config";
import type { HapticFeedbackType } from "../../model";
import { vibrate } from "../vibrate";

export const Haptics = {
	async isEffectsSupported() {
		return false;
	},
	trigger(type: HapticFeedbackType = "selection", _: HapticOptions = {}) {
		const pattern = fallbackWebPatterns[type] || TICK_PATTERN;
		return vibrate(pattern);
	},
};
