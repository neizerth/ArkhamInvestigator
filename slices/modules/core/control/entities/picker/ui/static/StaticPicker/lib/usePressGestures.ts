import { useLongPress, useTap } from "@modules/core/touch/shared/lib";
import type { StaticPickerProps } from "../ui";

export function usePressGestures<T>({
	onPress,
	onLongPress,
}: StaticPickerProps<T>) {
	const tap = useTap({
		gestureActionType: "picker",
		onTap: onPress,
	});

	const longPress = useLongPress({
		gestureActionType: "picker",
		onLongPress,
	});

	return [tap, longPress];
}
