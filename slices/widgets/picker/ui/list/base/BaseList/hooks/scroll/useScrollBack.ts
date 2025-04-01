import type {
	PickerEndReachedEvent,
	PickerScrollEvent,
	PickerStartReachedEvent,
} from "@widgets/picker/model";
import type { PickerScrollDirection } from "@widgets/picker/model/common";
import { useCallback, useRef } from "react";
import { Platform } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

const scrollBack = Platform.OS === "android";

export const useScrollBack = (props: BaseListProps) => {
	const {
		onStartReached: onStartReachedProp,
		onEndReached: onEndReachedProp,
		onOverScrollEnd: onOverScrollEndProp,
		onOverScrollStart: onOverScrollStartProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onScrollBeginDrag: onScrollBeginDragProp,
		onScroll: onScrollProp,
		ref,
	} = props;

	const touching = useRef(false);
	const offset = useRef(0);
	const initialScrollDirection = useRef<PickerScrollDirection>("initial");

	const scrollToStart = useCallback(() => {
		ref?.current?.scrollToIndex({
			index: 0,
			animated: false,
		});
	}, [ref?.current]);

	const scrollToEnd = useCallback(() => {
		ref?.current?.scrollToEnd({
			animated: false,
		});
	}, [ref?.current]);

	const onOverScrollEnd = useCallback(() => {
		onOverScrollEndProp?.();
		if (!scrollBack) {
			return;
		}
		scrollToEnd();
	}, [onOverScrollEndProp, scrollToEnd]);

	const onOverScrollStart = useCallback(() => {
		onOverScrollStartProp?.();
		if (!scrollBack) {
			return;
		}
		scrollToStart();
	}, [onOverScrollStartProp, scrollToStart]);

	const onStartReached = useCallback(
		(e: PickerStartReachedEvent) => {
			initialScrollDirection.current = "up";
			if (typeof onStartReachedProp === "function") {
				onStartReachedProp(e);
			}
			if (!scrollBack) {
				return;
			}
			scrollToStart();
		},
		[onStartReachedProp, scrollToStart],
	);

	const onEndReached = useCallback(
		(e: PickerEndReachedEvent) => {
			initialScrollDirection.current = "down";
			if (typeof onEndReachedProp === "function") {
				onEndReachedProp(e);
			}
			if (!scrollBack) {
				return;
			}
			scrollToEnd();
		},
		[onEndReachedProp, scrollToEnd],
	);

	const onScrollDeactivated = useCallback(() => {
		initialScrollDirection.current = "initial";
		touching.current = false;
		onScrollDeactivatedProp?.();
	}, [onScrollDeactivatedProp]);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = e.nativeEvent.contentOffset.y;
			touching.current = true;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			const currentOffset = e.nativeEvent.contentOffset.y;
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			const delta = currentOffset - offset.current;

			offset.current = currentOffset;
			if (
				!scrollBack ||
				touching.current ||
				initialScrollDirection.current === "initial"
			) {
				return;
			}
			if (delta < 0 && initialScrollDirection.current === "up") {
				scrollToStart();
			}
			if (delta > 0 && initialScrollDirection.current === "down") {
				scrollToEnd();
			}
		},
		[onScrollProp, scrollToEnd, scrollToStart],
	);

	return {
		...props,
		onEndReached,
		onStartReached,
		onOverScrollEnd,
		onOverScrollStart,
		onScrollDeactivated,
		onScroll,
		onScrollBeginDrag,
	};
};
