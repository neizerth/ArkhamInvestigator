import { getValueIndex } from "@widgets/picker/lib";
import type { PickerScrollEvent } from "@widgets/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export const useValueChange = (props: BaseListProps) => {
	const {
		onScroll: onScrollProp,
		onScrollDeactivated: onScrollDeactivatedProp,
		onValueChanged,
		data,
		itemHeight,
	} = props;

	const offset = useRef(0);
	const currentIndex = getValueIndex(props);

	const onScrollDeactivated = useCallback(() => {
		onScrollDeactivatedProp?.();
		const index = Math.round(offset.current / itemHeight);
		if (index === currentIndex) {
			return;
		}

		const value = data[index];

		onValueChanged?.({
			value,
			index,
		});
	}, [itemHeight, currentIndex, data, onValueChanged, onScrollDeactivatedProp]);

	const onScroll = useCallback(
		(e: PickerScrollEvent) => {
			if (typeof onScrollProp === "function") {
				onScrollProp(e);
			}
			offset.current = e.nativeEvent.contentOffset.y;
		},
		[onScrollProp],
	);

	return {
		...props,
		onScroll,
		onScrollDeactivated,
	};
};
