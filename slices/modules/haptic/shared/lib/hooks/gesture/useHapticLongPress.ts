import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import type { HapticPatternType } from "../../../../model";
import { useHapticCallback } from "../useHapticCallback";

type Options = {
	onLongPress?: () => void | unknown;
	pattern?: HapticPatternType;
};
export const useHapticLongPress = ({ pattern, onLongPress }: Options) => {
	const onStart = useHapticCallback({
		callback: onLongPress,
		pattern,
	});

	return useMemo(() => {
		return Gesture.LongPress().runOnJS(true).onStart(onStart);
	}, [onStart]);
};
