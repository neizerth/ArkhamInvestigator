import { fallbackDefaultPatterns } from "../../config";
import type { HapticMode, HapticPatternType } from "../../model";
import { getDefaultModePattern } from "./getDefaultModePattern";

type Options = {
	mode?: HapticMode;
	pattern?: HapticPatternType;
};

export const getHapticPattern = ({ mode = "default", pattern }: Options) => {
	const defaultFeedback = getDefaultModePattern(mode);
	const feedback = pattern || defaultFeedback;

	if (typeof feedback === "string" && mode === "default") {
		return fallbackDefaultPatterns[feedback] || feedback;
	}

	return feedback;
};
