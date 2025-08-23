import { setShowDescription } from "@modules/board/base/shared/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./BoardDescriptionExpandArea.components";

export type BoardDescriptionExpandAreaProps = ViewProps;

export const BoardDescriptionExpandArea = (
	props: BoardDescriptionExpandAreaProps,
) => {
	const dispatch = useAppDispatch();

	const show = useCallback(() => {
		dispatch(setShowDescription(true));
	}, [dispatch]);

	const openReference = useCallback(() => {
		dispatch(goToPage(routes.roundReference));
	}, [dispatch]);

	const swipeUp = useSwipe({
		direction: "up",
		onSwipe: show,
	});

	const swipeRight = useSwipe({
		direction: "right",
		onSwipe: openReference,
	});

	const press = Gesture.Tap().runOnJS(true).onStart(show);

	const gesture = Gesture.Exclusive(swipeUp, swipeRight, press);
	return (
		<GestureDetector gesture={gesture}>
			<C.Area {...props} />
		</GestureDetector>
	);
};
