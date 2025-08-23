import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { PickerScrollEvent } from "../../../../../../model";
import type { BaseListProps } from "../../BaseList.types";

export function useActivation<T>(props: BaseListProps<T>) {
	const {
		onActivated: onActivatedProp,
		onDeactivated: onDeactivatedProp,
		onTouchStart: onTouchStartProp,
		onTouchEnd: onTouchEndProp,
		onScroll: onScrollProp,
		onScrollEndDrag: onScrollEndDragProp,
	} = props;

	const active = useRef(false);
	const scroll = useRef(false);

	const tryActivate = useCallback(() => {
		if (active.current) {
			return;
		}
		active.current = true;
		onActivatedProp?.();
	}, [onActivatedProp]);

	const tryDeactivate = useCallback(() => {
		if (!active.current) {
			return;
		}
		active.current = false;
		scroll.current = false;
		onDeactivatedProp?.();
	}, [onDeactivatedProp]);

	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			tryActivate();
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp(e);
			}
		},
		[tryActivate, onTouchStartProp],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			scroll.current = true;
			tryActivate();
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
		},
		[onScrollProp, tryActivate],
	);

	const onTouchEnd = useCallback(
		(e: GestureResponderEvent) => {
			if (typeof onTouchEndProp === "function") {
				onTouchEndProp(e);
			}
			if (scroll.current) {
				return;
			}
			tryDeactivate();
		},
		[tryDeactivate, onTouchEndProp],
	);

	const onScrollEndDrag = useCallback(
		(e: PickerScrollEvent) => {
			scroll.current = false;
			tryDeactivate();
			if (typeof onScrollEndDragProp === "function") {
				onScrollEndDragProp(e);
			}
		},
		[tryDeactivate, onScrollEndDragProp],
	);

	return {
		...props,
		onTouchStart,
		onTouchEnd,
		onScroll,
		onScrollEndDrag,
	};
}
