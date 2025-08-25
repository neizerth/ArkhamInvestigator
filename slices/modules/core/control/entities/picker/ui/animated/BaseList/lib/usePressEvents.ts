import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { PickerScrollEvent } from "../../../../model";
import type { BaseListProps } from "../model";

export function usePressEvents<T>(props: BaseListProps<T>) {
	const {
		onTouchStart: onTouchStartProp,
		onPressIn,
		onPressOut: onPressOutProp,
		onTouchEnd: onTouchEndProp,
		onScrollEndDrag: onScrollEndDragProp,
		onPressChange,
	} = props;

	const touching = useRef(false);

	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			touching.current = true;
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp(e);
			}
			onPressIn?.();
			onPressChange?.(true);
		},
		[onTouchStartProp, onPressIn, onPressChange],
	);

	const onPressOut = useCallback(() => {
		if (!touching.current) {
			return;
		}
		touching.current = false;
		onPressOutProp?.();
		onPressChange?.(false);
	}, [onPressOutProp, onPressChange]);

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
}
