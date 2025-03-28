import { getValueOffsets } from "@widgets/picker/lib";
import { getReachedOffsets } from "@widgets/picker/lib/getReachedOffsets";
import type { PickerScrollEvent } from "@widgets/picker/model";
import type { PickerScrollDirection } from "@widgets/picker/model/common";
import { useCallback, useMemo, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export const useValueChanging = (props: BaseListProps) => {
	const {
		onScroll: onScrollProp,
		onScrollEnd: onScrollEndProp,
		onUserActivationChange: onUserActivationChangeProp,
		onValueChanging,
		itemHeight,
		data,
	} = props;

	const size = data.length;

	const offset = useRef(0);
	const scrollActivated = useRef(false);
	const touching = useRef(false);
	const scrollDirection = useRef<PickerScrollDirection>("initial");

	const offsets = useMemo(() => {
		return getValueOffsets(size, itemHeight);
	}, [size, itemHeight]);

	const onUserActivationChange = useCallback(
		(value: boolean) => {
			touching.current = value;
			onUserActivationChangeProp?.(value);
		},
		[onUserActivationChangeProp],
	);

	const triggerOffsetChange = useCallback(
		(offset: number, index: number) => {
			const value = data[index];
			onValueChanging?.({
				index,
				value,
			});
		},
		[data, onValueChanging],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			const isScrollActive = scrollActivated.current;
			scrollActivated.current = true;

			if (typeof onScrollProp === "function") {
				onScrollProp?.(e);
			}
			const currentOffset = e.nativeEvent.contentOffset.y;

			if (!isScrollActive) {
				offset.current = currentOffset;
				return;
			}

			const delta = offset.current - currentOffset;
			if (touching.current) {
				scrollDirection.current = delta > 0 ? "down" : "up";
			}

			const direction = scrollDirection.current;

			const reachedOffsets = getReachedOffsets({
				offsets,
				direction,
				from: offset.current,
				to: currentOffset,
			});

			if (reachedOffsets.length === 0) {
				return;
			}

			offset.current = currentOffset;

			reachedOffsets.forEach(triggerOffsetChange);
		},
		[onScrollProp, offsets, triggerOffsetChange],
	);

	const onScrollEnd = useCallback(() => {
		scrollActivated.current = false;
		if (typeof onScrollEndProp === "function") {
			onScrollEndProp();
		}
	}, [onScrollEndProp]);

	return {
		...props,
		onScroll,
		onUserActivationChange,
		onScrollEnd,
	};
};
