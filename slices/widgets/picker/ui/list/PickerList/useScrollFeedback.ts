import { useHapticFeedback } from "@features/haptic";
import type { PickerChangeEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { PickerListProps } from "./PickerList";

export const useScrollFeedback = (props: PickerListProps) => {
	const {
		onValueChanging: onValueChangingProp,
		onUserActivationChange: onUserActivationChangeProp,
		scrollHapticPattern,
	} = props;

	const impactFeedback = useHapticFeedback(scrollHapticPattern);
	const hapticEnabled = useRef(false);

	const onUserActivationChange = useCallback(
		(activated: boolean) => {
			hapticEnabled.current = activated;
			if (typeof onUserActivationChangeProp === "function") {
				onUserActivationChangeProp(activated);
			}
		},
		[onUserActivationChangeProp],
	);

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
		onUserActivationChange,
		onValueChanging,
	};
};
