import type { MaybePromise } from "@shared/model";
import type { PressGestureType } from "./press";
import type { SwipeGestureType } from "./swipe";

export type AbstractTouchCallback<T = void> = (
	args: T,
) => MaybePromise<void | false>;

export type TouchType = PressGestureType | SwipeGestureType | "custom";
