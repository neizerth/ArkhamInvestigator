import { useCallback } from "react";
import type {
	TouchableOpacityProps as BaseTouchableOpacityProps,
	GestureResponderEvent,
} from "react-native";

import { TouchableOpacity as BaseTouchableOpacity } from "react-native";

import { handlePress } from "./handlePress";
import { type HapticPatternType, useHapticFeedback } from "@features/haptic";

export type TouchableOpacityProps = BaseTouchableOpacityProps & {
	pressHapticPattern?: HapticPatternType;
	pressInHapticPattern?: HapticPatternType;
	pressOutHapticPattern?: HapticPatternType;
	longPressHapticPattern?: HapticPatternType;
};

export const TouchableOpacity = ({
	pressHapticPattern = 'clockTick',
	pressInHapticPattern = 'clockTick',
	pressOutHapticPattern = 'clockTick',
	longPressHapticPattern = 'clockTick',
	...props
}: TouchableOpacityProps) => {
	const pressFeedback = useHapticFeedback(pressHapticPattern);
	const pressInFeedback = useHapticFeedback(pressInHapticPattern);
	const pressOutFeedback = useHapticFeedback(pressOutHapticPattern);
	const longPressFeedback = useHapticFeedback(longPressHapticPattern)

	const onPress = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onPress,
				impactFeedback: pressFeedback,
			}),
		[props.onPress, pressFeedback],
	);

	const onPressIn = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onPressIn,
				impactFeedback: pressInFeedback,
			}),
		[props.onPressIn, pressInFeedback],
	);

	const onPressOut = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onPressOut,
				impactFeedback: pressOutFeedback,
			}),
		[props.onPressOut, pressOutFeedback],
	);

	const onLongPress = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onLongPress,
				impactFeedback: longPressFeedback,
			}),
		[props.onLongPress, longPressFeedback],
	);

	return (
		<BaseTouchableOpacity
			{...props}
			onPress={onPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onLongPress={onLongPress}
		/>
	);
};
