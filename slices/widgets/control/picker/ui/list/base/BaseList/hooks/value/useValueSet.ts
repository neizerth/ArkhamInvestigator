import { useCallback, useEffect, useRef } from "react";
import type { FlatList, GestureResponderEvent } from "react-native";
import { getValueIndex } from "../../../../../../lib";
import type {
	PickerChangeEvent,
	PickerScrollEvent,
} from "../../../../../../model";
import type { BaseListProps } from "../../BaseList.types";

export const useValueSet = (props: BaseListProps) => {
	const {
		data,
		onScrollBeginDrag: onScrollBeginDragProp,
		onTouchStart: onTouchStartProp,
		onValueChanging: onValueChangingProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onContentSizeChange: onContentSizeChangeProp,
		animated,
		controlEnabled = true,
	} = props;
	const ref = useRef<FlatList<number>>(null);
	const active = useRef(false);
	const scrolling = useRef(false);

	const currentIndex = Math.min(getValueIndex(props), data.length - 1);

	const index = useRef(currentIndex);

	const getAnimated = useCallback(() => {
		return animated !== undefined ? animated : !active.current;
	}, [animated]);

	const scrollToIndex = useCallback(() => {
		if (!controlEnabled) {
			return;
		}
		if (index.current === currentIndex) {
			return;
		}
		const animated = getAnimated();

		ref.current?.scrollToIndex({
			index: currentIndex,
			animated,
		});
	}, [getAnimated, currentIndex, controlEnabled]);

	useEffect(() => {
		scrollToIndex();
	}, [scrollToIndex]);

	const onContentSizeChange = useCallback(
		(width: number, height: number) => {
			if (typeof onContentSizeChangeProp === "function") {
				onContentSizeChangeProp?.(width, height);
			}
			scrollToIndex();
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

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			scrolling.current = true;
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

	const onValueChanging = useCallback(
		(e: PickerChangeEvent) => {
			index.current = e.index;
			if (!active.current) {
				return;
			}
			onValueChangingProp?.(e);
		},
		[onValueChangingProp],
	);

	return {
		...props,
		ref,
		onScrollDeactivated,
		onContentSizeChange,
		onValueChanging,
		onTouchStart,
		onScrollBeginDrag,
	};
};
