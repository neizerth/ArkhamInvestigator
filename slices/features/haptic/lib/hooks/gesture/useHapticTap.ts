import { useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import type { HapticPatternType } from "../../../model";
import { useHapticFeedback } from "../useHapticFeedback";

export type Options = {
	onPress?: () => void | unknown;
	pattern?: HapticPatternType;
};
export const useHapticTap = ({ pattern, onPress }: Options) => {
	const impactHapticFeedback = useHapticFeedback(pattern);

	const onStart = useCallback(() => {
		const response = onPress?.();

		if (response === false) {
			return;
		}

		impactHapticFeedback();
	}, [onPress, impactHapticFeedback]);

	return useMemo(() => {
		return Gesture.Tap().runOnJS(true).onStart(onStart);
	}, [onStart]);
};
