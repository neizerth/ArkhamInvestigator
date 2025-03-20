import { fallbackIOSPatterns } from "@features/haptic/config";
import HapticFeedback, {
	HapticFeedbackTypes,
	type HapticOptions,
} from "react-native-haptic-feedback";
export * from "react-native-haptic-feedback";

type HapticType = keyof typeof HapticFeedbackTypes;

const Haptics = {
	trigger(
		type: HapticType = HapticFeedbackTypes.selection,
		options: HapticOptions = {},
	) {
		const pattern = fallbackIOSPatterns[type] || type;
		return HapticFeedback.trigger(pattern, options);
	},
};

export default Haptics;
