import type { HapticMode, HapticPatternType } from "../model";

type Mode = Exclude<HapticMode, false>;
export const defaultModeFeedback: Record<Mode, HapticPatternType> = {
	system: "effectTick",
	default: "clockTick",
};

export const DEFAULT_HAPTIC_FEEDBACK: HapticPatternType = "clockTick";
