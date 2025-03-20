import { useMemo, useRef } from "react";

export type BooleanRefReducer = boolean | ((prev: boolean) => boolean);

export type BooleanRefController = {
	put: (reducer: BooleanRefReducer) => void;
	on: () => void;
	off: () => void;
	toggle: () => void;
};
export const useBooleanRef = (defaultValue: boolean) => {
	const value = useRef(defaultValue);

	const controller: BooleanRefController = useMemo(() => {
		const setValue = (reducer: BooleanRefReducer) => {
			if (typeof reducer === "boolean") {
				value.current = reducer;
				return;
			}
			value.current = reducer(value.current);
		};

		return {
			put: setValue,
			on: () => setValue(true),
			off: () => setValue(false),
			toggle: () => setValue((prev) => !prev),
		};
	}, []);
	return [value, controller] as [typeof value, typeof controller];
};
