import type {
	PickerEndReachedEvent,
	PickerStartReachedEvent,
} from "@widgets/picker/model";
import { useCallback } from "react";
import { Platform } from "react-native";
import type { BaseListProps } from "../../BaseList.types";

const isAndroid = Platform.OS === "android";
type Props = BaseListProps;
export const useScrollEdges = (props: Props) => {
	const {
		onStartReached: onStartReachedProp,
		onEndReached: onEndReachedProp,
		ref,
	} = props;

	const onStartReached = useCallback(
		(e: PickerStartReachedEvent) => {
			if (typeof onStartReachedProp === "function") {
				onStartReachedProp(e);
			}
			if (!isAndroid) {
				return;
			}

			ref?.current?.scrollToIndex({
				index: 0,
				animated: false,
			});
		},
		[onStartReachedProp, ref?.current],
	);

	const onEndReached = useCallback(
		(e: PickerEndReachedEvent) => {
			if (typeof onEndReachedProp === "function") {
				onEndReachedProp(e);
			}
			if (!isAndroid) {
				return;
			}
			ref?.current?.scrollToEnd();
		},
		[onEndReachedProp, ref?.current],
	);

	return {
		...props,
		onStartReached,
		onEndReached,
	};
};
