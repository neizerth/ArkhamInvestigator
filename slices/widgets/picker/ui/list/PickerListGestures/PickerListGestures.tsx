import { useHapticFeedback } from "@features/haptic";
import { arrayIf } from "@shared/lib";
import type {
	PickerPressProps,
	PickerScrollProps,
} from "@widgets/picker/model";
import { type PropsWithChildren, useCallback } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type PickerListGesturesProps = PropsWithChildren &
	PickerPressProps &
	PickerScrollProps & {
		pressEnabled: boolean;
		doublePressEnabled: boolean;
		longPressEnabled: boolean;
	};

export const PickerListGestures = ({
	children,

	pressEnabled,
	onPress,
	pressMaxDuration = 250,
	pressHapticPattern,

	doublePressEnabled,
	onDoublePress,
	doublePressHapticPattern,
	doublePressMaxDuration = 250,

	longPressEnabled,
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
		arrayIf(
			pressEnabled,
			Gesture.Tap().maxDuration(pressMaxDuration).runOnJS(true).onStart(onTap),
		),
		arrayIf(
			doublePressEnabled,
			Gesture.Tap()
				.numberOfTaps(2)
				.maxDuration(doublePressMaxDuration)
				.runOnJS(true)
				.onStart(onDoubleTap),
		),
		arrayIf(
			longPressEnabled,
			Gesture.LongPress()
				.minDuration(longPressMinDuration)
				.runOnJS(true)
				.onStart(onLongPressCallback),
		),
	].flat();

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
