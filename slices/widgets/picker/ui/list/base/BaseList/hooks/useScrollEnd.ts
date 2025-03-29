import type { PickerScrollEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../BaseList.types";

const END_TIMEOUT = 50;

export const useScrollEnd = (props: BaseListProps) => {
	const {
		onScrollEnd,
		onLastScroll,
		onMomentumScrollEnd: onMomentumScrollEndProp,
		onScroll: onScrollProp,
	} = props;
	const scrollEndTimeout = useRef<NodeJS.Timeout>();

	const delayScrollEnd = useCallback(() => {
		if (!onLastScroll) {
			return;
		}
		clearTimeout(scrollEndTimeout.current);
		scrollEndTimeout.current = setTimeout(onLastScroll, END_TIMEOUT);
	}, [onLastScroll]);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			delayScrollEnd();
		},
		[onScrollProp, delayScrollEnd],
	);

	const onMomentumScrollEnd = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onMomentumScrollEndProp === "function") {
				onMomentumScrollEndProp(e);
			}
			onScrollEnd?.();
		},
		[onScrollEnd, onMomentumScrollEndProp],
	);

	return {
		...props,
		onScroll,
		onMomentumScrollEnd,
	};
};
