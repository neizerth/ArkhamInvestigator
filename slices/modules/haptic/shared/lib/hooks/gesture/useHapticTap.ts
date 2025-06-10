import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import type { HapticPatternType } from "../../../../model";
import { useHapticCallback } from "../useHapticCallback";

type Options = {
	onPress?: () => void | unknown;
	pattern?: HapticPatternType;
};

export const useHapticTap = ({ pattern, onPress }: Options) => {
	const onStart = useHapticCallback({
		callback: onPress,
		pattern,
	});

	return useMemo(() => {
		return Gesture.Tap().runOnJS(true).onStart(onStart);
	}, [onStart]);
};
