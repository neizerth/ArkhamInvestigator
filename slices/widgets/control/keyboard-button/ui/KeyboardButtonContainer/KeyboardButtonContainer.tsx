import { type TouchableOpacityProps, useHapticSwipe } from "@features/haptic";
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
	const swipeUp = useHapticSwipe({
		direction: Directions.UP,
		onSwipe: onSwipeUp,
	});

	const swipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: onSwipeDown,
	});

	const gestureConfig = Gesture.Exclusive(swipeUp, swipeDown);

	return (
		<GestureDetector gesture={gestureConfig}>
			<C.Container {...props} />
		</GestureDetector>
	);
};
