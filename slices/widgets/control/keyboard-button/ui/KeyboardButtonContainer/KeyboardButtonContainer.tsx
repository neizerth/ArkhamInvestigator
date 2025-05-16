import type { TouchableOpacityProps } from "@features/haptic";
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
	onSwipeUp,
	onSwipeDown,
	...props
}: KeyboardButtonContainerProps) => {
	const swipeUp = Gesture.Fling()
		.direction(Directions.UP)
		.runOnJS(true)
		.onStart(() => onSwipeUp?.());

	const swipeDown = Gesture.Fling()
		.direction(Directions.DOWN)
		.runOnJS(true)
		.onStart(() => onSwipeDown?.());

	const gestureConfig = Gesture.Exclusive(swipeUp, swipeDown);

	return (
		<GestureDetector gesture={gestureConfig}>
			<C.Container {...props} />
		</GestureDetector>
	);
};
