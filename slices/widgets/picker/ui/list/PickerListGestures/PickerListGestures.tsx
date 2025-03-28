import { useHapticFeedback } from "@features/haptic";
import type {
	PickerPressProps,
	PickerScrollProps,
} from "@widgets/picker/model";
import { isNotNil } from "ramda";
import { type PropsWithChildren, useCallback } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type PickerListGesturesProps = PropsWithChildren &
	PickerPressProps &
	PickerScrollProps;

export const PickerListGestures = ({
	children,

	onPress,
	pressMaxDuration = 250,
	pressHapticPattern,

	onDoublePress,
	doublePressHapticPattern,
	doublePressMaxDuration = 250,

	onLongPress,
	longPressMinDuration = 500,
	longPressHapticPattern,
}: PickerListGesturesProps) => {
	const pressFeedback = useHapticFeedback(pressHapticPattern);
	const doublePressFeedback = useHapticFeedback(doublePressHapticPattern);
	const longPressFeedback = useHapticFeedback(longPressHapticPattern);

	const onTap = useCallback(() => {
		pressFeedback();
		onPress?.();
	}, [pressFeedback, onPress]);

	const onDoubleTap = useCallback(() => {
		doublePressFeedback();
		onDoublePress?.();
	}, [doublePressFeedback, onDoublePress]);

	const onLongPressCallback = useCallback(() => {
		longPressFeedback();
		onLongPress?.();
	}, [longPressFeedback, onLongPress]);

	const gestures = [
		onPress &&
			Gesture.Tap().maxDuration(pressMaxDuration).runOnJS(true).onStart(onTap),
		onDoublePress &&
			Gesture.Tap()
				.numberOfTaps(2)
				.maxDuration(doublePressMaxDuration)
				.runOnJS(true)
				.onStart(onDoubleTap),
		onLongPress &&
			Gesture.LongPress()
				.minDuration(longPressMinDuration)
				.runOnJS(true)
				.onStart(onLongPressCallback),
	].filter(isNotNil);

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
