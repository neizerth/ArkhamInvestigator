import { type ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import type { SwipeGestureType, TouchActionPayload } from "../../../model";

export const swipeUp = createAction<TouchActionPayload>("touch/swipeUp");
export const swipeDown = createAction<TouchActionPayload>("touch/swipeDown");

export const swipeLeft = createAction<TouchActionPayload>("touch/swipeLeft");
export const swipeRight = createAction<TouchActionPayload>("touch/swipeRight");

export const swipeActions: Record<
	SwipeGestureType,
	ActionCreatorWithPayload<TouchActionPayload>
> = {
	"swipe-up": swipeUp,
	"swipe-down": swipeDown,
	"swipe-left": swipeLeft,
	"swipe-right": swipeRight,
};
