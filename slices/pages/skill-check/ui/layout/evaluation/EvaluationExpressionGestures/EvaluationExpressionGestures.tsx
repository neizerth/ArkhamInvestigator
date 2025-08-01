import {
	selectSkillCheckData,
	selectSkillCheckDifficulty,
	sendCommandSignal,
	setSkillCheckDifficulty,
} from "@modules/board/skill-check/shared/lib";
import { useLongPress, useSwipe } from "@modules/core/touch/shared/lib";
import { minMax, useAppDispatch, useAppSelector } from "@shared/lib";
import { type PropsWithChildren, useCallback } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type EvaluationExpressionGesturesProps = PropsWithChildren;

export const EvaluationExpressionGestures = ({
	children,
}: EvaluationExpressionGesturesProps) => {
	const dispatch = useAppDispatch();
	const expression = useAppSelector(selectSkillCheckData);
	const difficulty = useAppSelector(selectSkillCheckDifficulty);

	const clearLast = useCallback(() => {
		dispatch(sendCommandSignal("clear-last"));
	}, [dispatch]);

	const onLongPress = useCallback(() => {
		const [first] = expression;

		if (expression.length > 1 || first.type !== "number") {
			return false;
		}

		const nextDifficulty =
			difficulty === first.value ? null : minMax(first.value, -9, 100);
		dispatch(setSkillCheckDifficulty(nextDifficulty));
	}, [dispatch, expression, difficulty]);

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: clearLast,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: clearLast,
	});

	const longPress = useLongPress({
		onLongPress,
	});

	const gestures = [
		swipeLeft,

		swipeRight,
		longPress,
	];

	const gestureConfig = Gesture.Exclusive(...gestures);
	return <GestureDetector gesture={gestureConfig}>{children}</GestureDetector>;
};
