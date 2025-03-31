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
		onUserDeactivated: onUserDeactivatedProp,
		onContentSizeChange: onContentSizeChangeProp,
		animated,
		controlEnabled = true,
	} = props;
	const ref = useRef<FlatList<number>>(null);
	const active = useRef(false);

	const currentIndex = Math.min(getValueIndex(props), data.length - 1);

	const index = useRef(currentIndex);

	const getAnimated = useCallback(() => {
		return animated !== undefined ? animated : active.current;
	}, [animated]);

	const scrollToIndex = useCallback(() => {
		if (!controlEnabled) {
			return;
		}

		ref.current?.scrollToIndex({
			index: currentIndex,
			animated: getAnimated(),
		});
	}, [getAnimated, currentIndex, controlEnabled]);

	useEffect(() => {
		if (active.current) {
			return;
		}
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

	const onScrollBeginDrag = useCallback(
		(e: PickerScrollEvent) => {
			active.current = true;
			if (typeof onScrollBeginDragProp === "function") {
				onScrollBeginDragProp(e);
			}
		},
		[onScrollBeginDragProp],
	);

	const onUserDeactivated = useCallback(() => {
		active.current = false;
		onUserDeactivatedProp?.();
	}, [onUserDeactivatedProp]);

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
		onUserDeactivated,
		onContentSizeChange,
		onValueChanging,
		onScrollBeginDrag,
	};
};
