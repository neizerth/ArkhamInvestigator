import { getValueIndex } from "@widgets/picker/lib";
import type {
	PickerChangeEvent,
	PickerScrollEvent,
} from "@widgets/picker/model";
import { useCallback, useEffect, useRef } from "react";
import type { FlatList } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

export const useValueSet = (props: BaseListProps) => {
	const {
		data,
		onScrollBeginDrag: onScrollBeginDragProp,
		onValueChanging: onValueChangingProp,
		onUserDeactivate: onUserDeactivateProp,
		animatedInit,
		onContentSizeChange: onContentSizeChangeProp,
	} = props;
	const ref = useRef<FlatList<number>>(null);
	const active = useRef(false);

	const currentIndex = Math.min(getValueIndex(props), data.length - 1);

	const index = useRef(currentIndex);

	const getAnimated = useCallback(() => {
		return animatedInit !== undefined ? animatedInit : active.current;
	}, [animatedInit]);

	const scrollToIndex = useCallback(() => {
		if (index.current === currentIndex) {
			return;
		}

		index.current = currentIndex;
		ref.current?.scrollToIndex({
			index: currentIndex,
			animated: getAnimated(),
		});
	}, [getAnimated, currentIndex]);

	useEffect(() => {
		scrollToIndex();
	}, [scrollToIndex]);

	const onContentSizeChange = useCallback(
		(width: number, height: number) => {
			scrollToIndex();
			if (typeof onContentSizeChangeProp === "function") {
				onContentSizeChangeProp?.(width, height);
			}
		},
		[onContentSizeChangeProp, scrollToIndex],
	);

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			active.current = true;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onUserDeactivate = useCallback(() => {
		active.current = false;
		onUserDeactivateProp?.();
	}, [onUserDeactivateProp]);

	const onValueChanging = useCallback(
		(e: PickerChangeEvent) => {
			onValueChangingProp?.(e);
			if (!active.current) {
				return;
			}
			index.current = e.index;
		},
		[onValueChangingProp],
	);

	return {
		...props,
		ref,
		onUserDeactivate,
		onContentSizeChange,
		onValueChanging,
		onScrollBeginDrag,
	};
};
