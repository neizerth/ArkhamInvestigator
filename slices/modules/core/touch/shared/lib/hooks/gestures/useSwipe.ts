import { useMemo } from "react";
import {
	Directions,
	type FlingGestureHandlerEventPayload,
	Gesture,
	type GestureStateChangeEvent,
} from "react-native-gesture-handler";
import type {
	AbstractTouchCallback,
	SwipeDirection,
	SwipeGestureType,
} from "../../../model";
import { useTouchCallback } from "../useTouchCallback";

type Callback = GestureStateChangeEvent<FlingGestureHandlerEventPayload>;

type Options = {
	direction: SwipeDirection;
	onSwipe?: AbstractTouchCallback<Callback>;
};

const swipeDirectionMapping: Record<SwipeDirection, Directions> = {
	left: Directions.LEFT,
	right: Directions.RIGHT,
	up: Directions.UP,
	down: Directions.DOWN,
};

export const useSwipe = ({ onSwipe, ...options }: Options) => {
	const touchType = `swipe-${options.direction}` as SwipeGestureType;
	const onStart = useTouchCallback({
		callback: onSwipe,
		touchType,
	});

	const direction = swipeDirectionMapping[options.direction];

	return useMemo(
		() => Gesture.Fling().direction(direction).runOnJS(true).onStart(onStart),
		[direction, onStart],
	);
};
