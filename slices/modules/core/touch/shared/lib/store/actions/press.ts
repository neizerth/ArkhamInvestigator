import { type ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import type { PressGestureType, TouchActionPayload } from "../../../model";

export const press = createAction<TouchActionPayload>("touch/press");

export const longPress = createAction<TouchActionPayload>("touch/longPress");

export const pressIn = createAction<TouchActionPayload>("touch/pressIn");
export const pressOut = createAction<TouchActionPayload>("touch/pressOut");

export const pressActions: Record<
	PressGestureType,
	ActionCreatorWithPayload<TouchActionPayload>
> = {
	press,
	longPress,
	pressIn,
	pressOut,
};
