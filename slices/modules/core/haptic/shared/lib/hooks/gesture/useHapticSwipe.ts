import { useMemo } from "react";
import { type Directions, Gesture } from "react-native-gesture-handler";
import type { HapticPatternType } from "../../../model";
import { useHapticCallback } from "../useHapticCallback";

type Options = {
	direction: Directions;
	onSwipe?: () => void | unknown;
	pattern?: HapticPatternType;
};
export const useHapticSwipe = ({ onSwipe, direction, pattern }: Options) => {
	const onStart = useHapticCallback({
		callback: onSwipe,
		pattern,
	});

	return useMemo(
		() => Gesture.Fling().direction(direction).runOnJS(true).onStart(onStart),
		[direction, onStart],
	);
};
