import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { routes } from "@shared/config";
import { setShowDescription, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { Gesture } from "react-native-gesture-handler";

export const useDescriptionGestures = () => {
	const dispatch = useAppDispatch();

	const hide = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);
	const goTo = useLeaveBoard();

	const swipeDown = useSwipe({
		direction: "down",
		onSwipe: hide,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: goTo(routes.roundReference),
	});

	return Gesture.Exclusive(swipeDown, swipeRight);
};
