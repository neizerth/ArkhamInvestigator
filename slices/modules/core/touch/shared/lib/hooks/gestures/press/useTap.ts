import { useMemo } from "react";
import {
	Gesture,
	type GestureStateChangeEvent,
	type TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import type { AbstractTouchCallback } from "../../../../model";
import { useTouchCallback } from "../../useTouchCallback";

type Callback = GestureStateChangeEvent<TapGestureHandlerEventPayload>;

type Options = {
	gestureActionType?: string;
	onTap?: AbstractTouchCallback<Callback>;
};
export const useTap = ({ gestureActionType, onTap }: Options) => {
	const onStart = useTouchCallback({
		touchActionType: gestureActionType,
		touchType: "press",
		callback: onTap,
	});

	return useMemo(() => {
		return Gesture.Tap().runOnJS(true).onStart(onStart);
	}, [onStart]);
};
