import { DEFAULT_HAPTIC_FEEDBACK, defaultModeFeedback } from "../../config";
import type { HapticMode } from "../../model";

export const getDefaultModePattern = (mode: HapticMode) => {
	return mode ? defaultModeFeedback[mode] : DEFAULT_HAPTIC_FEEDBACK;
};
