import { useSound } from "@modules/core/sound/shared/lib";
import { useUICallback } from "@modules/core/ui/lib";
import { useCallback, useRef } from "react";
import type { PickerChangeEvent, PickerScrollEvent } from "../../../../model";
import type { PickerListProps } from "../PickerList.types";

export const useScrollFeedback = (props: PickerListProps) => {
	const {
		onValueChanging: onValueChangingProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onLongPress: onLongPressProp,
		onValueChanged: onValueChangedProp,
		sound = true,
	} = props;

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

	const onValueChanging = useUICallback<PickerChangeEvent>({
		payload: {
			source: "picker",
			type: "changing",
		},
		callback(e) {
			onValueChangingProp?.(e);
			if (!hapticEnabled.current) {
				return false;
			}
		},
	});

	const onValueChanged = useCallback(
		(e: PickerChangeEvent) => {
			onValueChangedProp?.(e);

			playSound(sound);
		},
		[onValueChangedProp, playSound, sound],
	);

	return {
		...props,
		onScrollBeginDrag,
		onValueChanging,
		onScrollDeactivated,
		onLongPress,
		onValueChanged,
	};
};
