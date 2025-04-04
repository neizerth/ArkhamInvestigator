import { getValueIndex } from "@widgets/control/picker/lib";
import type { PickerChangeEvent } from "@widgets/control/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../BaseList.types";

export const useValueChange = (props: BaseListProps) => {
	const {
		onScrollDeactivated: onScrollDeactivatedProp,
		onValueChanging: onValueChangingProp,
		onValueChanged,
		value,
	} = props;

	const index = getValueIndex(props);

	const item = useRef<PickerChangeEvent>({
		value,
		index,
	});

	const onScrollDeactivated = useCallback(() => {
		onScrollDeactivatedProp?.();
		if (value === item.current.value) {
			return;
		}
		onValueChanged?.(item.current);
	}, [onValueChanged, onScrollDeactivatedProp, value]);

	const onValueChanging = useCallback(
		(e: PickerChangeEvent) => {
			item.current = e;
			onValueChangingProp?.(e);
		},
		[onValueChangingProp],
	);

	return {
		...props,
		onValueChanging,
		onScrollDeactivated,
	};
};
