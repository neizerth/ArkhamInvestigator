import {
	defaultModeFeedback,
	fallbackDefaultPatterns,
} from "@features/haptic/config";
import { useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { HapticPatternType } from "../../model";
import { impactHapticFeedback } from "../impactHapticFeedback";
import { selectHapticMode } from "../store/features/haptic/haptic";

export const useHapticFeedback = (
	hapticPattern?: HapticPatternType,
	defaultForce = false,
) => {
	const mode = useAppSelector(selectHapticMode);
	return useCallback(
		(currentPattern?: HapticPatternType, force = false) => {
			const enabled = force || defaultForce || Boolean(mode);
			if (!enabled) {
				return;
			}
			const defaultFeedback = mode ? defaultModeFeedback[mode] : "clockTick";
			const feedback = currentPattern || hapticPattern || defaultFeedback;

			if (typeof feedback === "string" && mode === "default") {
				const haptic = fallbackDefaultPatterns[feedback] || feedback;
				impactHapticFeedback(haptic);
				return;
			}

			impactHapticFeedback(feedback);
		},
		[mode, hapticPattern, defaultForce],
	);
};
