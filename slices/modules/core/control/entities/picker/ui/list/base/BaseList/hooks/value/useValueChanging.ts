import { getValueIndex } from "@modules/core/control/entities/picker/lib";
import type { PickerScrollEvent } from "@modules/core/control/entities/picker/model";
import type { PickerScrollDirection } from "@modules/core/control/entities/picker/model/common";
import { range } from "ramda";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export function useValueChanging<T>(props: BaseListProps<T>) {
	const {
		onScroll: onScrollProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onValueChanging,
		onScrollEnd: onScrollEndProp,
		itemHeight,
		data,
	} = props;

	const index = getValueIndex(props);
	const initialOffset = index * itemHeight;
	const maxIndex = data.length - 1;

	const offset = useRef(initialOffset);
	const offsetIndex = useRef(index);
	const scrollDirection = useRef<PickerScrollDirection>("initial");

	const triggerOffsetChange = useCallback(
		(index: number) => {
			if (index > maxIndex) {
				return;
			}
			const value = data[index];
			const event = {
				index,
				value,
			};
			onValueChanging?.(event);
		},
		[data, onValueChanging, maxIndex],
	);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = initialOffset;
			scrollDirection.current = "initial";
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp, initialOffset],
	);

	const onScrollEnd = useCallback(() => {
		scrollDirection.current = "initial";
		onScrollEndProp?.();
	}, [onScrollEndProp]);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp?.(e);
			}
			const currentOffset = Math.round(e.nativeEvent.contentOffset.y);

			const delta = currentOffset - offset.current;
			if (scrollDirection.current === "initial") {
				scrollDirection.current = delta > 0 ? "up" : "down";
			}

			if (delta === 0) {
				return;
			}
			const indexValue = currentOffset / itemHeight;
			const eps = 0.05;
			const index =
				scrollDirection.current === "up"
					? Math.floor(indexValue + eps)
					: Math.ceil(indexValue - eps);

			const prevIndex = offsetIndex.current;

			offset.current = currentOffset;

			if (index === prevIndex) {
				return;
			}

			offsetIndex.current = index;

			const changed = getIndexes(index, prevIndex);

			changed.forEach(triggerOffsetChange);
		},
		[onScrollProp, itemHeight, triggerOffsetChange],
	);

	return {
		...props,
		onScroll,
		onScrollBeginDrag,
		onScrollEnd,
	};
}

const getIndexes = (index: number, prevIndex: number) => {
	if (index > prevIndex) {
		return range(prevIndex + 1, index + 1);
	}

	return range(index, prevIndex).toReversed();
};
