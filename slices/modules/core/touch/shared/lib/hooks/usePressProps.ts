import { useMemo } from "react";
import { COMMON_PRESS_TYPE_ID } from "../../config";
import type { AbstractPressProps } from "../../model";
import { useTouchCallback } from "./useTouchCallback";

export function usePressProps<T>(props: AbstractPressProps<T>) {
	const { pressActionType = COMMON_PRESS_TYPE_ID } = props;
	const onPress = useTouchCallback({
		touchActionType: pressActionType,
		touchType: "press",
		callback: props.onPress,
	});

	const onLongPress = useTouchCallback({
		touchActionType: pressActionType,
		touchType: "longPress",
		callback: props.onLongPress,
	});

	const onPressIn = useTouchCallback({
		touchActionType: pressActionType,
		touchType: "pressIn",
		callback: props.onPressIn,
	});

	const onPressOut = useTouchCallback({
		touchActionType: pressActionType,
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
