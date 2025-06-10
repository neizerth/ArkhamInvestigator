import { useHapticFeedback, useHapticSwipe } from "@modules/haptic/shared/lib";
import { arrayIf } from "@shared/lib";
import { type PropsWithChildren, useCallback } from "react";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import type {
	PickerActivationProps,
	PickerGestureProps,
	PickerHapticScrollProps,
	PickerPressProps,
} from "../../../model";

export type PickerListGesturesProps = PropsWithChildren &
	PickerPressProps &
	PickerGestureProps &
	PickerActivationProps &
	PickerHapticScrollProps & {
		pressEnabled: boolean;
		doublePressEnabled: boolean;
		longPressEnabled: boolean;

		swipeLeftEnabled: boolean;
		swipeRightEnabled: boolean;
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

	swipeLeftEnabled,
	onSwipeLeft,
	swipeLeftHapticPattern,

	swipeRightEnabled,
	onSwipeRight,
	swipeRightHapticPattern,

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

	const swipeRight = useHapticSwipe({
		direction: Directions.RIGHT,
		onSwipe: onSwipeRight,
		pattern: swipeRightHapticPattern,
	});

	const swipeLeft = useHapticSwipe({
		direction: Directions.LEFT,
		onSwipe: onSwipeLeft,
		pattern: swipeLeftHapticPattern,
	});

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
		arrayIf(swipeLeftEnabled, swipeLeft),
		arrayIf(swipeRightEnabled, swipeRight),
	].flat();

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
