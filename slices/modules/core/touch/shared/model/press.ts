import type { GestureResponderEvent } from "react-native";
import type { AbstractTouchCallback } from "./common";

export type PressCallback = AbstractTouchCallback<GestureResponderEvent>;

export type AbstractPressProps<T> = {
	touchActionType?: string;

	onPress?: AbstractTouchCallback<T>;
	onPressIn?: AbstractTouchCallback<T>;
	onPressOut?: AbstractTouchCallback<T>;
	onLongPress?: AbstractTouchCallback<T>;
};

export type PressProps = {
	touchActionType?: string;

	onPress?: PressCallback;
	onPressIn?: PressCallback;
	onPressOut?: PressCallback;
	onLongPress?: PressCallback;
};

export type PressGestureType =
	| "press"
	| "pressIn"
	| "pressOut"
	| "longPress"
	| "doublePress";
