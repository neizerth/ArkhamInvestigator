import {
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";

export const useSwipeGestures = () => {
	const dispatch = useAppDispatch();

	const onSwipeLeft = useCallback(() => {
		dispatch(setPrevBoardIndex());
	}, [dispatch]);

	const onSwipeRight = useCallback(() => {
		dispatch(setNextBoardIndex());
	}, [dispatch]);

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: onSwipeLeft,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: onSwipeRight,
	});

	return useMemo(() => {
		return [swipeLeft, swipeRight];
	}, [swipeLeft, swipeRight]);
};
