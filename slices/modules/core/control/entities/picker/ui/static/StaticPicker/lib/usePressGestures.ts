import { useLongPress, useTap } from "@modules/core/touch/shared/lib";
import type { StaticPickerProps } from "../ui";

export function usePressGestures<T>({
	onPress,
	onLongPress,
	onPressIn,
	onPressOut,
}: StaticPickerProps<T>) {
	const tap = useTap({
		gestureActionType: "picker",
		onTap: onPress,
	})
		.onTouchesDown(() => onPressIn?.())
		.onTouchesUp(() => onPressOut?.());

	const longPress = useLongPress({
		gestureActionType: "picker",
		onLongPress,
	});

	return [tap, longPress];
}
