import { useHapticFeedback } from "@features/haptic";
import {
	selectSkillCheckData,
	selectSkillCheckDifficulty,
	sendCommandSignal,
	setSkillCheckDifficulty,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
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
	const impactHapticFeedback = useHapticFeedback();
	const expression = useAppSelector(selectSkillCheckData);
	const difficulty = useAppSelector(selectSkillCheckDifficulty);

	const clearLast = useCallback(() => {
		dispatch(sendCommandSignal("clear-last"));
	}, [dispatch]);

	const onTap = useCallback(() => {
		const [first] = expression;

		if (expression.length > 1 || first.type !== "number") {
			return;
		}

		impactHapticFeedback();
		const nextDifficulty = difficulty === first.value ? null : first.value;
		dispatch(setSkillCheckDifficulty(nextDifficulty));
	}, [dispatch, impactHapticFeedback, expression, difficulty]);

	const gestures = [
		Gesture.Fling().direction(Directions.LEFT).runOnJS(true).onStart(clearLast),

		Gesture.Fling()
			.direction(Directions.RIGHT)
			.runOnJS(true)
			.onStart(clearLast),
		Gesture.LongPress().runOnJS(true).onStart(onTap),
	];

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
