import { useSwipe } from "@modules/core/touch/shared/lib";
import type { StaticPickerProps } from "../ui";
import { useValueChange } from "./useValueChange";

export function useSwipeGestures<T>(props: StaticPickerProps<T>) {
	const { prev, next } = useValueChange(props);

	const swipeUp = useSwipe({
		touchActionType: "picker",
		direction: "up",
		onSwipe: next,
	});

	const swipeDown = useSwipe({
		touchActionType: "picker",
		direction: "down",
		onSwipe: prev,
	});

	const swipeLeft = useSwipe({
		touchActionType: "picker",
		direction: "left",
		onSwipe: props.onSwipeLeft,
	});

	const swipeRight = useSwipe({
		touchActionType: "picker",
		direction: "right",
		onSwipe: props.onSwipeRight,
	});

	return [swipeUp, swipeDown, swipeLeft, swipeRight];
}
