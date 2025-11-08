import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import {
	selectDescriptionTransition,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";

export const useDescriptionGestures = () => {
	const dispatch = useAppDispatch();
	const transition = useAppSelector(selectDescriptionTransition);

	const hide = useCallback(() => {
		if (transition) {
			return;
		}
		dispatch(setShowDescription(false));
	}, [dispatch, transition]);

	const goTo = useLeaveBoard();

	const swipeDown = useSwipe({
		direction: "down",
		onSwipe: hide,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: goTo(routes.roundReference),
	});

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: goTo(routes.skillTestReference),
	});

	return Gesture.Exclusive(swipeDown, swipeRight, swipeLeft);
};
