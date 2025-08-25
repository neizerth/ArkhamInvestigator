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

	return [swipeUp, swipeDown];
}
