import { useHapticFeedback } from "@features/haptic";
import { useSound } from "@features/sound";
import type {
	PickerChangeEvent,
	PickerScrollEvent,
} from "@widgets/control/picker/model";
import { useCallback, useRef } from "react";
import type { PickerListProps } from "../PickerList.types";

export const useScrollFeedback = (props: PickerListProps) => {
	const {
		onValueChanging: onValueChangingProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onLongPress: onLongPressProp,
		scrollHapticPattern,
		sound = true,
	} = props;

	const impactFeedback = useHapticFeedback(scrollHapticPattern);
	const playSound = useSound();
	const hapticEnabled = useRef(false);
	const longPress = useRef(false);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			hapticEnabled.current = true;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp?.(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onScrollDeactivated = useCallback(() => {
		hapticEnabled.current = longPress.current;
		longPress.current = false;
		onScrollDeactivatedProp?.();
	}, [onScrollDeactivatedProp]);

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
			playSound(sound);
			impactFeedback();
		},
		[onValueChangingProp, impactFeedback, playSound, sound],
	);

	return {
		...props,
		onScrollBeginDrag,
		onValueChanging,
		onScrollDeactivated,
		onLongPress,
	};
};
