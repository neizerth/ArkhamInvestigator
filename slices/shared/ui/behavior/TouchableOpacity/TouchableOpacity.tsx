import type { HapticPatternType } from "@shared/model/features/device/haptic";
import { useCallback } from "react";
import type {
	TouchableOpacityProps as BaseTouchableOpacityProps,
	GestureResponderEvent,
} from "react-native";

import { TouchableOpacity as BaseTouchableOpacity } from "react-native";

import { handlePress } from "./handlePress";

export type TouchableOpacityProps = BaseTouchableOpacityProps & {
	pressHapticPattern?: HapticPatternType;
	pressInHapticPattern?: HapticPatternType;
	pressOutHapticPattern?: HapticPatternType;
	longPressHapticPattern?: HapticPatternType;
};

export const TouchableOpacity = ({
	pressHapticPattern,
	pressInHapticPattern,
	pressOutHapticPattern,
	longPressHapticPattern,
	...props
}: TouchableOpacityProps) => {
	const onPress = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onPress,
				pattern: pressHapticPattern,
			}),
		[props.onPress, pressHapticPattern],
	);

	const onPressIn = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onPressIn,
				pattern: pressInHapticPattern,
			}),
		[props.onPressIn, pressInHapticPattern],
	);

	const onPressOut = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onPressOut,
				pattern: pressOutHapticPattern,
			}),
		[props.onPressOut, pressOutHapticPattern],
	);

	const onLongPress = useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler: props.onLongPress,
				pattern: longPressHapticPattern,
			}),
		[props.onLongPress, longPressHapticPattern],
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
