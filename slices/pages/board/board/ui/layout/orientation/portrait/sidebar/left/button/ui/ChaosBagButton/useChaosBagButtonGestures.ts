import { openReferenceCard } from "@entities/reference-card";
import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useLongPress, useSwipe, useTap } from "@modules/core/touch/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";

export const useChaosBagButtonGestures = () => {
	const dispatch = useAppDispatch();
	const goToPage = useLeaveBoard();

	const revealToken = useCallback(() => {
		dispatch(
			startChaosBagReveal({
				boardId: "current",
			}),
		);
	}, [dispatch]);

	const onSwipeUp = useCallback(() => {
		dispatch(openReferenceCard());
	}, [dispatch]);
	const chaosBagSwipeRight = useSwipe({
		direction: "right",
		onSwipe: revealToken,
	});

	const chaosBagSwipeDown = useSwipe({
		direction: "down",
		onSwipe: goToPage(routes.chaosBagHistory),
	});

	const chaosBagSwipeUp = useSwipe({
		direction: "up",
		onSwipe: onSwipeUp,
	});

	const longPress = useLongPress({
		onLongPress: revealToken,
	});

	const tap = useTap({
		onTap: goToPage(routes.chaosBagPreview),
	});

	const chaosBagGestures = [
		chaosBagSwipeRight,
		chaosBagSwipeDown,
		chaosBagSwipeUp,
		longPress,
		tap,
	];

	return Gesture.Exclusive(...chaosBagGestures);
};
