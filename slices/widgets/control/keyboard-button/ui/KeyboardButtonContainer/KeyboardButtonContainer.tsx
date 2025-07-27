import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSwipe } from "../../../../../modules/core/touch/shared/lib/hooks/gestures/useSwipe";
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
	const swipeUp = useSwipe({
		direction: "up",
		onSwipe: onSwipeUp,
	});

	const swipeDown = useSwipe({
		direction: "down",
		onSwipe: onSwipeDown,
	});

	const gestureConfig = Gesture.Exclusive(swipeUp, swipeDown);

	return (
		<GestureDetector gesture={gestureConfig}>
			<C.Container {...props} />
		</GestureDetector>
	);
};
