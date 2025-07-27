import { useMemo } from "react";
import { COMMON_TOUCH_TYPE_ID } from "../../config";
import type { AbstractPressProps } from "../../model";
import { useTouchCallback } from "./useTouchCallback";

export function usePressProps<T>(props: AbstractPressProps<T>) {
	const { touchActionType = COMMON_TOUCH_TYPE_ID } = props;
	const onPress = useTouchCallback({
		touchActionType,
		touchType: "press",
		callback: props.onPress,
	});

	const onLongPress = useTouchCallback({
		touchActionType,
		touchType: "longPress",
		callback: props.onLongPress,
	});

	const onPressIn = useTouchCallback({
		touchActionType,
		touchType: "pressIn",
		callback: props.onPressIn,
	});

	const onPressOut = useTouchCallback({
		touchActionType,
		touchType: "pressOut",
		callback: props.onPressOut,
	});

	return useMemo(() => {
		return {
			onPress,
			onLongPress,
			onPressIn,
			onPressOut,
		};
	}, [onPress, onLongPress, onPressIn, onPressOut]);
}
