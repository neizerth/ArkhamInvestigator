import { useHapticFeedback } from "@features/haptic";
import type { PickerChangeEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { PickerListProps } from "./PickerList";

export const useScrollFeedback = (props: PickerListProps) => {
	const {
		onValueChanging: onValueChangingProp,
		onTouchStart: onTouchStartProp,
		onDeactivated: onDeactivatedProp,
		onLongPress: onLongPressProp,
		scrollHapticPattern,
	} = props;

	const impactFeedback = useHapticFeedback(scrollHapticPattern);
	const hapticEnabled = useRef(false);
	const longPress = useRef(false);

	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			hapticEnabled.current = true;
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp?.(e);
			}
		},
		[onTouchStartProp],
	);

	const onDeactivated = useCallback(() => {
		hapticEnabled.current = longPress.current;
		longPress.current = false;
		onDeactivatedProp?.();
	}, [onDeactivatedProp]);

	const onLongPress = useCallback(() => {
		hapticEnabled.current = false;
		longPress.current = true;
		onLongPressProp?.();
	}, [onLongPressProp]);

	const onValueChanging = useCallback(
		(e: PickerChangeEvent) => {
			onValueChangingProp?.(e);
			if (!hapticEnabled.current) {
				return;
			}
			impactFeedback();
		},
		[onValueChangingProp, impactFeedback],
	);

	return {
		...props,
		onTouchStart,
		onValueChanging,
		onDeactivated,
		onLongPress,
	};
};
