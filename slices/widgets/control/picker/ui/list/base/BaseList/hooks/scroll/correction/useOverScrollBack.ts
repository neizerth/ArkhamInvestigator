import type {
	PickerEndReachedEvent,
	PickerScrollEvent,
	PickerStartReachedEvent,
} from "@widgets/control/picker/model";
import type { PickerScrollDirection } from "@widgets/control/picker/model/common";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../../BaseList.types";

export const useOverScrollBack = (props: BaseListProps) => {
	const {
		onScroll: onScrollProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onScrollEndDrag: onScrollEndDragProp,
		onStartReached: onStartReachedProp,
		onEndReached: onEndReachedProp,
		itemHeight,
		data,
		ref,
	} = props;

	const offset = useRef(0);
	const touching = useRef(false);
	const scrollDirection = useRef<PickerScrollDirection>("initial");

	const lastIndex = data.length - 1;
	const lastOffset = itemHeight * lastIndex;
	const endReached = useRef(false);
	const startReached = useRef(false);

	const onStartReached = useCallback(
		(e: PickerStartReachedEvent) => {
			startReached.current = true;
			if (typeof onStartReachedProp === "function") {
				onStartReachedProp(e);
			}
		},
		[onStartReachedProp],
	);

	const onEndReached = useCallback(
		(e: PickerEndReachedEvent) => {
			endReached.current = true;
			if (typeof onEndReachedProp === "function") {
				onEndReachedProp(e);
			}
		},
		[onEndReachedProp],
	);

	const scrollToStart = useCallback(() => {
		ref?.current?.scrollToIndex({
			index: 0,
			animated: false,
		});
	}, [ref?.current]);

	const scrollToEnd = useCallback(() => {
		ref?.current?.scrollToIndex({
			index: lastIndex,
			animated: false,
		});
	}, [ref?.current, lastIndex]);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = e.nativeEvent.contentOffset.y;
			scrollDirection.current = "initial";
			touching.current = true;
			startReached.current = false;
			endReached.current = false;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			const currentOffset = e.nativeEvent.contentOffset.y;
			const delta = offset.current - currentOffset;

			const direction: PickerScrollDirection =
				delta === 0 ? "initial" : delta < 0 ? "down" : "up";

			offset.current = currentOffset;
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			if (touching.current) {
				startReached.current = false;
				endReached.current = false;
				scrollDirection.current = direction;
				return;
			}
			if (scrollDirection.current === "initial") {
				return;
			}
			if (direction === scrollDirection.current) {
				return;
			}
			if (currentOffset > 0 && startReached.current) {
				scrollToStart();
			}
			if (currentOffset < lastOffset && endReached.current) {
				scrollToEnd();
			}
		},
		[onScrollProp, scrollToStart, lastOffset, scrollToEnd],
	);

	const onScrollEndDrag = useCallback(
		(e: PickerScrollEvent) => {
			touching.current = false;
			if (typeof onScrollEndDragProp === "function") {
				onScrollEndDragProp(e);
			}
		},
		[onScrollEndDragProp],
	);

	return {
		...props,
		onScrollEndDrag,
		onScroll,
		onScrollBeginDrag,
		onStartReached,
		onEndReached,
	};
};
