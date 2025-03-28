import { getDataOffsets, getValueIndex } from "@widgets/picker/lib";
import { getReachedOffsets } from "@widgets/picker/lib/getReachedOffsets";
import type { PickerScrollEvent } from "@widgets/picker/model";
import type { PickerScrollDirection } from "@widgets/picker/model/common";
import { useCallback, useMemo, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export const useValueChanging = (props: BaseListProps) => {
	const {
		onScroll: onScrollProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onUserActivationChange: onUserActivationChangeProp,
		onValueChanging,
		itemHeight,
		data,
	} = props;

	const size = data.length;
	const index = getValueIndex(props);
	const initialOffset = index * itemHeight;

	const offset = useRef(initialOffset);
	const touching = useRef(false);
	const scrollDirection = useRef<PickerScrollDirection>("initial");

	const offsets = useMemo(() => {
		return getDataOffsets(size, itemHeight);
	}, [size, itemHeight]);

	const onUserActivationChange = useCallback(
		(value: boolean) => {
			touching.current = value;
			onUserActivationChangeProp?.(value);
		},
		[onUserActivationChangeProp],
	);

	const triggerOffsetChange = useCallback(
		(offset: number) => {
			const index = offsets.indexOf(offset);
			const value = data[index];

			onValueChanging?.({
				index,
				value,
			});
		},
		[data, offsets, onValueChanging],
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
			const currentOffset = e.nativeEvent.contentOffset.y;

			const delta = offset.current - currentOffset;
			if (touching.current) {
				scrollDirection.current = delta > 0 ? "down" : "up";
			}

			const direction = scrollDirection.current;

			const options = {
				offsets,
				direction,
				from: offset.current,
				to: currentOffset,
			};
			const reachedOffsets = getReachedOffsets(options);

			if (reachedOffsets.length === 0) {
				return;
			}

			offset.current = currentOffset;

			reachedOffsets.forEach(triggerOffsetChange);
		},
		[onScrollProp, offsets, triggerOffsetChange],
	);

	const onScrollDeactivated = useCallback(() => {
		touching.current = false;
		scrollDirection.current = "initial";

		if (typeof onScrollDeactivatedProp === "function") {
			onScrollDeactivatedProp?.();
		}
	}, [onScrollDeactivatedProp]);

	return {
		...props,
		onScroll,
		onUserActivationChange,
		onScrollDeactivated,
		onScrollBeginDrag,
	};
};
