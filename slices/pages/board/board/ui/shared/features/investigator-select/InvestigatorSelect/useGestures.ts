import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import {
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { useLongPress, useSwipe, useTap } from "@modules/core/touch/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";

export const useGestures = () => {
	const dispatch = useAppDispatch();
	const goToPage = useLeaveBoard();

	const next = useCallback(() => {
		dispatch(setNextBoardIndex());
	}, [dispatch]);

	const prev = useCallback(() => {
		dispatch(setPrevBoardIndex());
	}, [dispatch]);

	const tap = useTap({
		onTap: next,
	});

	const longPress = useLongPress({
		onLongPress: goToPage(routes.overview),
	});

	const swipeUp = useSwipe({
		direction: "up",
		onSwipe: prev,
	});

	const swipeDown = useSwipe({
		direction: "down",
		onSwipe: next,
	});

	return useMemo(() => {
		return Gesture.Exclusive(tap, longPress, swipeUp, swipeDown);
	}, [tap, longPress, swipeUp, swipeDown]);
};
