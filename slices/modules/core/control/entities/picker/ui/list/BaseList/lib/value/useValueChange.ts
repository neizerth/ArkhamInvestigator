import { getValueIndex } from "@modules/core/control/entities/picker/lib";
import type { PickerChangeEvent } from "@modules/core/control/entities/picker/model";
import { useCallback, useRef } from "react";
import type { BaseListProps } from "../../model";

export function useValueChange<T>(props: BaseListProps<T>) {
	const {
		onScrollDeactivated: onScrollDeactivatedProp,
		onValueChanging: onValueChangingProp,
		onValueChanged,
		value,
	} = props;

	const index = getValueIndex(props);

	const item = useRef<PickerChangeEvent<T>>({
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
		(e: PickerChangeEvent<T>) => {
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
}
