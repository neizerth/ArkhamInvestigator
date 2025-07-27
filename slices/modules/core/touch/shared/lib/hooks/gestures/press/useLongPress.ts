import { useMemo } from "react";
import {
	Gesture,
	type GestureStateChangeEvent,
	type LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import type { AbstractTouchCallback } from "../../../../model";
import { useTouchCallback } from "../../useTouchCallback";

type Callback = GestureStateChangeEvent<LongPressGestureHandlerEventPayload>;

type Options = {
	gestureActionType?: string;
	onLongPress?: AbstractTouchCallback<Callback>;
};
export const useLongPress = ({ gestureActionType, onLongPress }: Options) => {
	const onStart = useTouchCallback({
		touchActionType: gestureActionType,
		touchType: "longPress",
		callback: onLongPress,
	});

	return useMemo(() => {
		return Gesture.LongPress().runOnJS(true).onStart(onStart);
	}, [onStart]);
};
