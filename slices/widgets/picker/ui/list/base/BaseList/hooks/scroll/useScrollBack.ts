import type {
	PickerEndReachedEvent,
	PickerStartReachedEvent,
} from "@widgets/picker/model";
import { useCallback } from "react";
import { Platform } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

const returnBack = Platform.OS === "android";

export const useScrollBack = (props: BaseListProps) => {
	const {
		onStartReached: onStartReachedProp,
		onEndReached: onEndReachedProp,
		onOverScrollEnd: onOverScrollEndProp,
		onOverScrollStart: onOverScrollStartProp,
		ref,
	} = props;

	const scrollToStart = useCallback(() => {
		ref?.current?.scrollToIndex({
			index: 0,
			animated: false,
		});
	}, [ref?.current]);

	const scrollToEnd = useCallback(() => {
		ref?.current?.scrollToEnd();
	}, [ref?.current]);

	const onOverScrollEnd = useCallback(() => {
		onOverScrollEndProp?.();
		if (!returnBack) {
			return;
		}
		scrollToEnd();
	}, [onOverScrollEndProp, scrollToEnd]);

	const onOverScrollStart = useCallback(() => {
		onOverScrollStartProp?.();
		if (!returnBack) {
			return;
		}
		scrollToStart();
	}, [onOverScrollStartProp, scrollToStart]);

	const onStartReached = useCallback(
		(e: PickerStartReachedEvent) => {
			if (typeof onStartReachedProp === "function") {
				onStartReachedProp(e);
			}
			if (!returnBack) {
				return;
			}
			scrollToStart();
		},
		[onStartReachedProp, scrollToStart],
	);

	const onEndReached = useCallback(
		(e: PickerEndReachedEvent) => {
			if (typeof onEndReachedProp === "function") {
				onEndReachedProp(e);
			}
			if (!returnBack) {
				return;
			}
			scrollToEnd();
		},
		[onEndReachedProp, scrollToEnd],
	);

	return {
		...props,
		onEndReached,
		onStartReached,
		onOverScrollEnd,
		onOverScrollStart,
	};
};
