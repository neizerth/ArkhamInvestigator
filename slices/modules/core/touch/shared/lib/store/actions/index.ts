import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { TouchActionPayload, TouchType } from "../../../model";
import { pressActions } from "./press";
import { swipeActions } from "./swipe";

export * from "./press";
export * from "./swipe";

export const touchActions: Record<
	TouchType,
	ActionCreatorWithPayload<TouchActionPayload>
> = {
	...pressActions,
	...swipeActions,
};
