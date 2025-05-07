import { runLater } from "@shared/lib";
import { always } from "ramda";
import { useCallback, useEffect, useRef } from "react";
import type { FlatList, GestureResponderEvent } from "react-native";
import { getValueIndex } from "../../../../../../lib";
import type { PickerScrollEvent } from "../../../../../../model";
import type { BaseListProps } from "../../BaseList.types";

const getInactiveState = always(false);

export const useValueSet = (props: BaseListProps) => {
	const {
		data,
		onScrollBeginDrag: onScrollBeginDragProp,
		onTouchStart: onTouchStartProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onContentSizeChange: onContentSizeChangeProp,
		onTouchEnd: onTouchEndProp,
		controlEnabled = true,
		onScroll: onScrollProp,
		itemHeight,
	} = props;
	const ref = useRef<FlatList<number>>(null);
	const active = useRef(false);
	const scrolling = useRef(false);
	const offset = useRef(0);

	const currentIndex = Math.min(getValueIndex(props), data.length - 1);

	const scrollToIndex = useCallback(() => {
		if (!controlEnabled || !ref.current) {
			return;
		}

		const indexOffset = itemHeight * currentIndex;

		const delta = Math.abs(offset.current - indexOffset);

		const minDelta = 2;

		if (delta < minDelta) {
			return;
		}

		ref.current.scrollToIndex({
			index: currentIndex,
			animated: false,
		});
	}, [currentIndex, controlEnabled, itemHeight]);

	useEffect(() => {
		active.current = getInactiveState(controlEnabled);
	}, [controlEnabled]);

	useEffect(() => {
		scrollToIndex();
	}, [scrollToIndex]);

	const onContentSizeChange = useCallback(
		(width: number, height: number) => {
			if (typeof onContentSizeChangeProp === "function") {
				onContentSizeChangeProp?.(width, height);
			}
			runLater(scrollToIndex);
		},
		[onContentSizeChangeProp, scrollToIndex],
	);

	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			active.current = true;
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp(e);
			}
		},
		[onTouchStartProp],
	);

	const onTouchEnd = useCallback(
		(e: GestureResponderEvent) => {
			active.current = false;
			if (typeof onTouchEndProp === "function") {
				onTouchEndProp(e);
			}
		},
		[onTouchEndProp],
	);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			scrolling.current = true;
			offset.current = e.nativeEvent.contentOffset.y;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onScrollDeactivated = useCallback(() => {
		active.current = false;
		scrolling.current = false;
		onScrollDeactivatedProp?.();
	}, [onScrollDeactivatedProp]);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			offset.current = e.nativeEvent.contentOffset.y;
			if (typeof onScrollProp === "function") {
				onScrollProp?.(e);
			}
		},
		[onScrollProp],
	);

	return {
		...props,
		ref,
		onScroll,
		onScrollDeactivated,
		onContentSizeChange,
		onTouchStart,
		onTouchEnd,
		onScrollBeginDrag,
	};
};
