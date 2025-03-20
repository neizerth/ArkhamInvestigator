import type {
	CustomHapticPatternType,
	VibrationPattern,
} from "@shared/model/features/device/haptic";
import { ImpactFeedbackStyle } from "expo-haptics";

export const TICK_PATTERN: VibrationPattern = [0, 5];
export const CLICK_PATTERN: VibrationPattern = [0, 10];

export const customVibrationPatterns: Record<
	CustomHapticPatternType,
	VibrationPattern
> = {
	tick: TICK_PATTERN,
	click: CLICK_PATTERN,
};
