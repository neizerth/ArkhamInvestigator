import { defaultModeFeedback } from "@features/haptic/config";
import { useCallback } from "react";
import { useAppSelector } from "../../../../shared/lib/hooks/store/useAppSelector";
import type { HapticPatternType } from "../../model";
import { impactHapticFeedback } from "../impactHapticFeedback";
import { selectHapticMode } from "../store/features/haptic/haptic";

export const useHapticFeedback = (hapticPattern?: HapticPatternType) => {
	const mode = useAppSelector(selectHapticMode);
	return useCallback(
		(currentPattern?: HapticPatternType) => {
			if (!mode) {
				return;
			}
			const defaultFeedback = defaultModeFeedback[mode];
			const feedback = currentPattern || hapticPattern || defaultFeedback;

			impactHapticFeedback(feedback);
		},
		[mode, hapticPattern],
	);
};
