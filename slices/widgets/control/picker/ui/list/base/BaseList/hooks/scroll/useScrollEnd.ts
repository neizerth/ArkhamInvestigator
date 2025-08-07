import type { PickerScrollEvent } from "@widgets/control/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

const END_TIMEOUT = 50;

export function useScrollEnd<T>(props: BaseListProps<T>) {
	const {
		onScrollEnd,
		onLastScroll,
		onMomentumScrollEnd: onMomentumScrollEndProp,
		onScroll: onScrollProp,
	} = props;
	const scrollEndTimeout = useRef<NodeJS.Timeout | null>(null);

	const delayScrollEnd = useCallback(() => {
		if (!onLastScroll) {
			return;
		}
		if (scrollEndTimeout.current) {
			clearTimeout(scrollEndTimeout.current);
		}
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
}
