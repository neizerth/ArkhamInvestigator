import { always } from "ramda";
import {
	NativeModules,
	type TurboModule,
	TurboModuleRegistry,
} from "react-native";
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

type HapticsSupportModule = {
	isEffectsSupported: () => Promise<boolean>;
};

const HapticsSupport: HapticsSupportModule = NativeModules.HapticsSupport;

export const Haptics = {
	isEffectsSupported() {
		if (typeof HapticsSupport.isEffectsSupported !== "function") {
			return Promise.resolve(false);
		}

		const onError = always(false);

		return HapticsSupport.isEffectsSupported().catch(onError);
	},
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
