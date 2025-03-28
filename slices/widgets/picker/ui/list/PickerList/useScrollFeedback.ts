import { useHapticFeedback } from "@features/haptic";
import type { PickerScrollEvent } from "@widgets/picker/model";
import { times } from "ramda";
import { useCallback, useRef } from "react";
import type { PickerListProps } from "./PickerList";

export const useScrollFeedback = (props: PickerListProps) => {
	const {
		onScroll: onScrollProp,
		onUserActivationChange: onUserActivationChangeProp,
		scrollHapticPattern,
		itemHeight,
	} = props;
	const scrollFeedback = useHapticFeedback(scrollHapticPattern);

	const index = useRef(0);
	const active = useRef(false);

	const onUserActivationChange = useCallback(
		(activated: boolean) => {
			active.current = activated;
			if (typeof onUserActivationChangeProp === "function") {
				onUserActivationChangeProp(activated);
			}
		},
		[onUserActivationChangeProp],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			const offset = e.nativeEvent.contentOffset.y;

			const scrollIndex = Math.round(offset / itemHeight);

			const n = Math.abs(index.current - scrollIndex);

			index.current = scrollIndex;

			if (!active.current) {
				return;
			}

			times(scrollFeedback, n);
		},
		[onScrollProp, scrollFeedback, itemHeight],
	);

	return {
		...props,
		onScroll,
		onUserActivationChange,
	};
};
