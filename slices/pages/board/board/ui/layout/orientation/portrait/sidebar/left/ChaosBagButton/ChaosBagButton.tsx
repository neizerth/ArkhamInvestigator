import { openReferenceCard } from "@entities/reference-card";
import { openRevealChaosTokenModal } from "@features/game/chaos-bag";
import { useHapticSwipe } from "@modules/haptic/shared/lib";
import { routes } from "@shared/config";
import { useAppDispatch, usePage } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import {
	Directions,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import * as C from "./ChaosBagButton.components";

export type ChaosBagButtonProps = ViewProps;

export const ChaosBagButton = (props: ChaosBagButtonProps) => {
	const dispatch = useAppDispatch();
	const goToPage = usePage();

	const revealToken = useCallback(() => {
		dispatch(openRevealChaosTokenModal());
	}, [dispatch]);

	const onSwipeUp = useCallback(() => {
		dispatch(openReferenceCard());
	}, [dispatch]);

	const chaosBagSwipeRight = useHapticSwipe({
		direction: Directions.RIGHT,
		onSwipe: revealToken,
	});

	const chaosBagSwipeDown = useHapticSwipe({
		direction: Directions.DOWN,
		onSwipe: goToPage(routes.chaosBagHistory),
	});

	const chaosBagSwipeUp = useHapticSwipe({
		direction: Directions.UP,
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
