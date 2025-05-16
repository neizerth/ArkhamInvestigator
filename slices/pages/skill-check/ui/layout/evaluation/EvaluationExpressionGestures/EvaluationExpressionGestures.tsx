import { sendCommandSignal, useAppDispatch } from "@shared/lib";
import { type PropsWithChildren, useCallback } from "react";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";

export type EvaluationExpressionGesturesProps = PropsWithChildren;

export const EvaluationExpressionGestures = ({
	children,
}: EvaluationExpressionGesturesProps) => {
	const dispatch = useAppDispatch();

	const clearLast = useCallback(() => {
		dispatch(sendCommandSignal("clear-last"));
	}, [dispatch]);

	const gestures = [
		Gesture.Fling().direction(Directions.LEFT).runOnJS(true).onStart(clearLast),

		Gesture.Fling()
			.direction(Directions.RIGHT)
			.runOnJS(true)
			.onStart(clearLast),
	];

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
