import { openReferenceCard } from "@entities/reference-card";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { useSwipe } from "@modules/core/touch/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, usePage } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./ChaosBagButton.components";

export type ChaosBagButtonProps = ViewProps;

export const ChaosBagButton = (props: ChaosBagButtonProps) => {
	const dispatch = useAppDispatch();
	const goToPage = usePage();

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

	const chaosBagGestures = [
		chaosBagSwipeRight,
		chaosBagSwipeDown,
		chaosBagSwipeUp,
	];

	const chaosBagGestureConfig = Gesture.Exclusive(...chaosBagGestures);

	return (
		<GestureDetector gesture={chaosBagGestureConfig}>
			<C.Button
				{...props}
				icon="chaos-bag-thin"
				onPress={goToPage(routes.chaosBagPreview)}
				onLongPress={revealToken}
			/>
		</GestureDetector>
	);
};
