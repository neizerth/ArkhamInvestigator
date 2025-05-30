import { useScrollToIndex } from "@shared/lib";
import type {
	PickerEndReachedEvent,
	PickerScrollEvent,
	PickerStartReachedEvent,
} from "@widgets/control/picker/model";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { BaseListProps } from "../../../BaseList.types";

export const useScrollBack = (props: BaseListProps) => {
	const {
		onStartReached: onStartReachedProp,
		onEndReached: onEndReachedProp,
		onPressIn: onPressInProp,
		onPressOut: onPressOutProp,
		onScroll: onScrollProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		itemHeight,
		ref,
		data,
	} = props;

	const lastIndex = data.length - 1;
	const lastOffset = itemHeight * lastIndex;
	const offset = useRef(0);
	const touching = useRef(false);

	const scrollToStart = useScrollToIndex({
		ref,
		index: 0,
	});

	const scrollToEnd = useScrollToIndex({
		ref,
		index: lastIndex,
	});

	const onStartReached = useCallback(
		(e: PickerStartReachedEvent) => {
			if (typeof onStartReachedProp === "function") {
				onStartReachedProp(e);
			}
			if (touching.current) {
				return;
			}
			scrollToStart();
		},
		[onStartReachedProp, scrollToStart],
	);

	const onEndReached = useCallback(
		(e: PickerEndReachedEvent) => {
			if (typeof onEndReachedProp === "function") {
				onEndReachedProp(e);
			}
			if (touching.current) {
				return;
			}
			scrollToEnd();
		},
		[onEndReachedProp, scrollToEnd],
	);

	const onPressIn = useCallback(
		(e: GestureResponderEvent) => {
			touching.current = true;
			onPressInProp?.(e);
		},
		[onPressInProp],
	);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = e.nativeEvent.contentOffset.y;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onPressOut = useCallback(() => {
		touching.current = false;
		onPressOutProp?.();
		if (offset.current > lastOffset) {
			scrollToEnd();
		}
		if (offset.current < 0) {
			scrollToStart();
		}
	}, [onPressOutProp, lastOffset, scrollToEnd, scrollToStart]);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = e.nativeEvent.contentOffset.y;
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
		},
		[onScrollProp],
	);

	return {
		...props,
		onEndReached,
		onStartReached,
		onPressIn,
		onPressOut,
		onScroll,
		onScrollBeginDrag,
	};
};
