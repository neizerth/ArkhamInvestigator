import type { PressHandler, PressProps } from "../../../shared/model";
import { useHapticFeedback } from "./useHapticFeedback";
import { usePressCallback } from "./usePressCallback";

type Options = PressProps & {
	onPress?: PressHandler;
	onPressIn?: PressHandler;
	onPressOut?: PressHandler;
	onLongPress?: PressHandler;
};

export const usePress = (props: Options) => {
	const {
		pressHapticPattern = "clockTick",
		pressInHapticPattern = "clockTick",
		pressOutHapticPattern = "clockTick",
		longPressHapticPattern = "clockTick",
	} = props;
	const pressFeedback = useHapticFeedback(pressHapticPattern);
	const pressInFeedback = useHapticFeedback(pressInHapticPattern);
	const pressOutFeedback = useHapticFeedback(pressOutHapticPattern);
	const longPressFeedback = useHapticFeedback(longPressHapticPattern);

	const onPress = usePressCallback({
		eventHandler: props.onPress,
		impactFeedback: pressFeedback,
	});

	const onPressIn = usePressCallback({
		eventHandler: props.onPressIn,
		impactFeedback: pressInFeedback,
	});

	const onPressOut = usePressCallback({
		eventHandler: props.onPressOut,
		impactFeedback: pressOutFeedback,
	});

	const onLongPress = usePressCallback({
		eventHandler: props.onLongPress,
		impactFeedback: longPressFeedback,
	});

	return {
		onPress,
		onLongPress,
		onPressIn,
		onPressOut,
	};
};
