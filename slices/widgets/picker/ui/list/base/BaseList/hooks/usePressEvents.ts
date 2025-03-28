import type { PickerScrollEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { BaseListProps } from "../BaseList.types";

export const usePressEvents = (props: BaseListProps) => {
	const {
		onTouchStart: onTouchStartProp,
		onPressIn,
		onPressOut: onPressOutProp,
		onTouchEnd: onTouchEndProp,
		onScrollEndDrag: onScrollEndDragProp,
	} = props;

	const touching = useRef(false);

	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			touching.current = true;
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp(e);
			}
			onPressIn?.(e);
		},
		[onTouchStartProp, onPressIn],
	);

	const onPressOut = useCallback(() => {
		if (!touching.current) {
			return;
		}
		touching.current = false;
		onPressOutProp?.();
	}, [onPressOutProp]);

	const onScrollEndDrag = useCallback(
		(e: PickerScrollEvent) => {
			onPressOut();
			if (typeof onScrollEndDragProp === "function") {
				onScrollEndDragProp(e);
			}
		},
		[onScrollEndDragProp, onPressOut],
	);

	const onTouchEnd = useCallback(
		(e: GestureResponderEvent) => {
			onPressOut();
			if (typeof onTouchEndProp === "function") {
				onTouchEndProp(e);
			}
		},
		[onTouchEndProp, onPressOut],
	);
	return {
		...props,
		onTouchStart,
		onScrollEndDrag,
		onTouchEnd,
	};
};
