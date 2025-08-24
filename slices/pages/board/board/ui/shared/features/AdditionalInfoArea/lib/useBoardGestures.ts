import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { usePressGesture } from "./usePressGesture";
import { useSwipeGestures } from "./useSwipeGestures";

type Options = {
	swipe: boolean;
};

export const useBoardGestures = ({ swipe }: Options) => {
	const count = useAppSelector(selectBoardsCount);

	const pressGesture = usePressGesture();

	const swipeGestures = useSwipeGestures();

	return useMemo(() => {
		const gestures =
			count > 1 && swipe ? [pressGesture, ...swipeGestures] : [pressGesture];

		return Gesture.Exclusive(...gestures);
	}, [count, pressGesture, swipeGestures, swipe]);
};
