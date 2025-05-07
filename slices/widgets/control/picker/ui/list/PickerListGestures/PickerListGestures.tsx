import { useHapticFeedback } from "@features/haptic";
import { useSound } from "@features/sound";
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
	sound,
}: PickerListGesturesProps) => {
	const pressFeedback = useHapticFeedback(pressHapticPattern);
	const doublePressFeedback = useHapticFeedback(doublePressHapticPattern);
	const longPressFeedback = useHapticFeedback(longPressHapticPattern);
	const playSound = useSound();

	const onTap = useCallback(() => {
		pressFeedback();
		playSound(sound);
		onPress?.();
	}, [pressFeedback, onPress, playSound, sound]);

	const onDoubleTap = useCallback(() => {
		doublePressFeedback();
		playSound(sound);
		onDoublePress?.();
	}, [doublePressFeedback, onDoublePress, playSound, sound]);

	const onLongPressCallback = useCallback(() => {
		longPressFeedback();
		playSound(sound);
		onLongPress?.();
	}, [longPressFeedback, onLongPress, playSound, sound]);

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
