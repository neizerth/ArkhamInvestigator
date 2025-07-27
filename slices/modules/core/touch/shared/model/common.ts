import type { PressGestureType } from "./press";
import type { SwipeGestureType } from "./swipe";

export type AbstractTouchCallback<T = void> = (args: T) => void | false;

export type TouchType = PressGestureType | SwipeGestureType;
