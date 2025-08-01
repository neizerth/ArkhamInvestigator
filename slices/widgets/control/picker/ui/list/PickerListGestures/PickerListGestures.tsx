import { useSwipe, useTouchCallback } from "@modules/core/touch/shared/lib";
import { arrayIf } from "@shared/lib";
import type { PropsWithChildren } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
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
	onPress: onPressProp,
	pressMaxDuration = 250,

	doublePressEnabled,
	onDoublePress: onDoublePressProp,
	doublePressMaxDuration = 250,

	longPressEnabled,
	onLongPress: onLongPressProp,
	longPressMinDuration = 500,

	swipeLeftEnabled,
	onSwipeLeft,

	swipeRightEnabled,
	onSwipeRight,

	onUserDeactivated,
	onDeactivated,
}: PickerListGesturesProps) => {
	const onPress = useTouchCallback({
		touchType: "press",
		callback: onPressProp,
	});

	const onDoublePress = useTouchCallback({
		touchType: "doublePress",
		callback: onDoublePressProp,
	});

	const onLongPress = useTouchCallback({
		touchType: "longPress",
		callback: onLongPressProp,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: onSwipeRight,
	});

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: onSwipeLeft,
	});

	const gestures = [
		arrayIf(
			pressEnabled,
			Gesture.Tap()
				.maxDuration(pressMaxDuration)
				.runOnJS(true)
				.onStart(onPress)
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
				.onStart(onDoublePress),
		),
		arrayIf(
			longPressEnabled,
			Gesture.LongPress()
				.minDuration(longPressMinDuration)
				.runOnJS(true)
				.onStart(onLongPress)
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
