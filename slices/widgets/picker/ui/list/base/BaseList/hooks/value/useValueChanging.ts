import { getValueIndex } from "@widgets/picker/lib";
import type { PickerScrollEvent } from "@widgets/picker/model";
import { range } from "ramda";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export const useValueChanging = (props: BaseListProps) => {
	const {
		onScroll: onScrollProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onValueChanging,
		itemHeight,
		data,
	} = props;

	const index = getValueIndex(props);
	const initialOffset = index * itemHeight;

	const offset = useRef(initialOffset);
	const offsetIndex = useRef(index);

	const triggerOffsetChange = useCallback(
		(index: number) => {
			const value = data[index];
			const event = {
				index,
				value,
			};
			onValueChanging?.(event);
		},
		[data, onValueChanging],
	);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = initialOffset;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp, initialOffset],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp?.(e);
			}
			const currentOffset = Math.round(e.nativeEvent.contentOffset.y);

			const delta = currentOffset - offset.current;

			if (delta === 0) {
				return;
			}

			const index = Math.ceil(currentOffset / itemHeight);
			const prevIndex = offsetIndex.current;

			offset.current = currentOffset;
			offsetIndex.current = index;

			if (index === prevIndex) {
				return;
			}

			const changed = getIndexes(index, prevIndex);
			changed.forEach(triggerOffsetChange);
		},
		[onScrollProp, itemHeight, triggerOffsetChange],
	);

	return {
		...props,
		onScroll,
		onScrollBeginDrag,
	};
};

const getIndexes = (index: number, prevIndex: number) => {
	if (index > prevIndex) {
		return range(prevIndex + 1, index + 1);
	}

	return range(index, prevIndex).toReversed();
};
