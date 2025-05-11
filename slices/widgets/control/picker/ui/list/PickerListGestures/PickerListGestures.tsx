import { useHapticFeedback } from "@features/haptic";
import { arrayIf } from "@shared/lib";
import { type PropsWithChildren, useCallback } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type {
	PickerActivationProps,
	PickerHapticScrollProps,
	PickerPressProps,
} from "../../../model";

export type PickerListGesturesProps = PropsWithChildren &
	PickerPressProps &
	PickerActivationProps &
	PickerHapticScrollProps & {
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

	onUserDeactivated,
	onDeactivated,
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
			Gesture.Tap()
				.maxDuration(pressMaxDuration)
				.runOnJS(true)
				.onStart(onTap)
				.onTouchesUp(() => {
					onUserDeactivated?.();
					onDeactivated?.();
				}),
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
				.onStart(onLongPressCallback)
				.onTouchesUp(() => {
					onUserDeactivated?.();
					onDeactivated?.();
				}),
		),
	].flat();

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
