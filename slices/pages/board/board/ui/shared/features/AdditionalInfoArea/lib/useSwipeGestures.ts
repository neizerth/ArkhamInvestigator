import {
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useMemo } from "react";
import type { FlingGesture } from "react-native-gesture-handler";

const emptyGestures: FlingGesture[] = [];

export const useSwipeGestures = (enabled: boolean) => {
	const dispatch = useAppDispatch();

	const onSwipeLeft = useCallback(() => {
		dispatch(setNextBoardIndex());
	}, [dispatch]);

	const onSwipeRight = useCallback(() => {
		dispatch(setPrevBoardIndex());
	}, [dispatch]);

	const swipeLeft = useSwipe({
		direction: "left",
		onSwipe: onSwipeLeft,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: onSwipeRight,
	});

	const gestures = useMemo(() => {
		return [swipeLeft, swipeRight];
	}, [swipeLeft, swipeRight]);

	return enabled ? gestures : emptyGestures;
};
