import { OVERSCROLL_TRESHOLD } from "@widgets/control/picker/config";
import { getValueIndex } from "@widgets/control/picker/lib";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

type Props = BaseListProps;
export const useOverScroll = (props: Props) => {
	const {
		onTouchStart: onTouchStartProp,
		onPressOut: onPressOutProp,
		onTouchMove: onTouchMoveProp,
		overScrollTreshold = OVERSCROLL_TRESHOLD,
		onOverScrollEnd,
		onOverScrollStart,
		data,
	} = props;

	const index = getValueIndex(props);
	const isLastIndex = index === data.length - 1;
	const isFirstIndex = index === 0;

	const startOffset = useRef(0);
	const stopOffset = useRef(0);
	const onTouchStart = useCallback(
		(e: GestureResponderEvent) => {
			startOffset.current = e.nativeEvent.touches[0].pageY;
			if (typeof onTouchStartProp === "function") {
				onTouchStartProp(e);
			}
		},
		[onTouchStartProp],
	);

	const onPressOut = useCallback(() => {
		onPressOutProp?.();
		const delta = startOffset.current - stopOffset.current;
		if (isFirstIndex && delta < -overScrollTreshold) {
			onOverScrollStart?.();
		}
		if (isLastIndex && delta > overScrollTreshold) {
			onOverScrollEnd?.();
		}
	}, [
		onPressOutProp,
		isFirstIndex,
		isLastIndex,
		onOverScrollStart,
		onOverScrollEnd,
		overScrollTreshold,
	]);

	const onTouchMove = useCallback(
		(e: GestureResponderEvent) => {
			stopOffset.current = e.nativeEvent.touches[0].pageY;
			if (typeof onTouchMoveProp === "function") {
				onTouchMoveProp(e);
			}
		},
		[onTouchMoveProp],
	);

	return {
		...props,
		onTouchStart,
		onPressOut,
		onTouchMove,
	};
};
