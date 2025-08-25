import { type TurboModule, TurboModuleRegistry } from "react-native";
import {
	HapticFeedbackTypes,
	type HapticOptions,
} from "react-native-haptic-feedback";
import { DEFAULT_ANDROID_PATTERN, fallbackAndroidPatterns } from "../../config";
export * from "react-native-haptic-feedback";

export interface Spec extends TurboModule {
	trigger(type: string, options?: HapticOptions): void;
}

type HapticType = keyof typeof HapticFeedbackTypes;

const HapticFeedback =
	TurboModuleRegistry.getEnforcing<Spec>("RNHapticFeedback");

export const Haptics = {
	trigger(
		type: HapticType = HapticFeedbackTypes.selection,
		options: HapticOptions = {},
	) {
		const pattern = fallbackAndroidPatterns[type] || type;
		try {
			return HapticFeedback.trigger(pattern, options);
		} catch (e) {
			HapticFeedback.trigger(DEFAULT_ANDROID_PATTERN, options);
		}
	},
};

export default Haptics;
