import { useCallback } from "react";
import { getValueIndex } from "../../../../lib";
import type { StaticPickerProps } from "../ui";

export function useValueChange<T>(props: StaticPickerProps<T>) {
	const { data, onValueChanged } = props;
	const index = getValueIndex(props);

	const nextIndex = Math.min(index + 1, data.length - 1);

	const prevIndex = Math.max(0, index - 1);

	const nextValue = data[nextIndex];
	const prevValue = data[prevIndex];

	const next = useCallback(() => {
		if (index === nextIndex) {
			return false;
		}

		const value = nextValue;

		onValueChanged?.({
			index: nextIndex,
			value,
		});
	}, [index, nextIndex, nextValue, onValueChanged]);

	const prev = useCallback(() => {
		if (index === prevIndex) {
			return false;
		}

		const value = prevValue;

		onValueChanged?.({
			index: prevIndex,
			value,
		});
	}, [index, prevIndex, prevValue, onValueChanged]);

	return {
		prev,
		next,
	};
}
