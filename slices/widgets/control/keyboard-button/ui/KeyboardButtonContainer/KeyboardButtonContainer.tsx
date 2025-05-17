import {
	type TouchableOpacityProps,
	useHapticFeedback,
} from "@features/haptic";
import { useCallback } from "react";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import * as C from "./KeyboardButtonContainer.components";

export type KeyboardButtonContainerProps = TouchableOpacityProps & {
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
};

export const KeyboardButtonContainer = ({
	onSwipeUp: onSwipeUpProp,
	onSwipeDown: onSwipeDownProp,
	...props
}: KeyboardButtonContainerProps) => {
	const impactHapticFeedback = useHapticFeedback();

	const onSwipeUp = useCallback(() => {
		if (!onSwipeUpProp) {
			return;
		}
		impactHapticFeedback();
		onSwipeUpProp();
	}, [onSwipeUpProp, impactHapticFeedback]);

	const onSwipeDown = useCallback(() => {
		if (!onSwipeDownProp) {
			return;
		}
		impactHapticFeedback();
		onSwipeDownProp();
	}, [onSwipeDownProp, impactHapticFeedback]);

	const swipeUp = Gesture.Fling()
		.direction(Directions.UP)
		.runOnJS(true)
		.onStart(onSwipeUp);

	const swipeDown = Gesture.Fling()
		.direction(Directions.DOWN)
		.runOnJS(true)
		.onStart(onSwipeDown);

	const gestureConfig = Gesture.Exclusive(swipeUp, swipeDown);

	return (
		<GestureDetector gesture={gestureConfig}>
			<C.Container {...props} />
		</GestureDetector>
	);
};
