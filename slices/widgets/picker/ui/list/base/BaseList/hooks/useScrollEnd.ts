import type { PickerScrollEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../BaseList.types";

const END_TIMEOUT = 50;

export const useScrollEnd = (props: BaseListProps) => {
	const { onScrollEnd, onScroll: onScrollProp } = props;
	const scrollEndTimeout = useRef<NodeJS.Timeout>();

	const delayScrollEnd = useCallback(() => {
		if (!onScrollEnd) {
			return;
		}
		clearTimeout(scrollEndTimeout.current);
		scrollEndTimeout.current = setTimeout(onScrollEnd, END_TIMEOUT);
	}, [onScrollEnd]);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			delayScrollEnd();
		},
		[onScrollProp, delayScrollEnd],
	);

	return {
		...props,
		onScroll,
	};
};
