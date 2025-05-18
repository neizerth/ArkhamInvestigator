import { useCallback, useMemo } from "react";
import { type Directions, Gesture } from "react-native-gesture-handler";
import type { HapticPatternType } from "../../model";
import { useHapticFeedback } from "./useHapticFeedback";

type Options = {
	direction: Directions;
	onSwipe?: () => void | boolean;
	pattern?: HapticPatternType;
};
export const useHapticSwipe = ({ onSwipe, direction, pattern }: Options) => {
	const impactHapticFeedback = useHapticFeedback(pattern);

	const callback = useCallback(() => {
		if (!onSwipe) {
			return;
		}
		const response = onSwipe();

		if (response === false) {
			return;
		}
		impactHapticFeedback();
	}, [impactHapticFeedback, onSwipe]);

	return useMemo(
		() => Gesture.Fling().direction(direction).runOnJS(true).onStart(callback),
		[direction, callback],
	);
};
