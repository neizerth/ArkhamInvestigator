import type { PickerScrollEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

export const useUserActivation = (props: BaseListProps) => {
	const {
		onUserActivate: onUserActivateProp,
		onUserDeactivate: onUserDeactivateProp,
		onUserActivationChange,
		onScroll: onScrollProp,
		onScrollEnd: onScrollEndProp,
		onPressOut: onPressOutProp,
		onTouchStart: onTouchStartProp,
	} = props;

	const touching = useRef(false);
	const scroll = useRef(false);
	const active = useRef(false);

	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp(e);
			}
			onUserActivateProp?.(e);
			onUserActivationChange?.(true);
			touching.current = true;
			active.current = true;
		},
		[onTouchStartProp, onUserActivationChange, onUserActivateProp],
	);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			scroll.current = true;
		},
		[onScrollProp],
	);

	const tryDeactivate = useCallback(() => {
		if (touching.current || scroll.current || !active.current) {
			return;
		}
		active.current = false;
		onUserActivationChange?.(false);
		onUserDeactivateProp?.();
	}, [onUserDeactivateProp, onUserActivationChange]);

	const onPressOut = useCallback(() => {
		touching.current = false;
		tryDeactivate();
		onPressOutProp?.();
	}, [onPressOutProp, tryDeactivate]);

	const onScrollEnd = useCallback(() => {
		scroll.current = false;
		tryDeactivate();
		if (typeof onScrollEndProp === "function") {
			onScrollEndProp();
		}
	}, [onScrollEndProp, tryDeactivate]);

	return {
		...props,
		onTouchStart,
		onScroll,
		onPressOut,
		onScrollEnd,
	};
};
