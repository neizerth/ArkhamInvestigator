import { useCallback } from "react";
import type { HapticPatternType } from "../../model";
import { useHapticFeedback } from "./useHapticFeedback";

type Options = {
	callback?: () => void | false;
	pattern?: HapticPatternType;
};

export const useHapticCallback = ({ callback, pattern }: Options) => {
	const impactHapticFeedback = useHapticFeedback(pattern);

	return useCallback(() => {
		const response = callback?.();

		if (response === false) {
			return;
		}

		impactHapticFeedback();
	}, [callback, impactHapticFeedback]);
};
