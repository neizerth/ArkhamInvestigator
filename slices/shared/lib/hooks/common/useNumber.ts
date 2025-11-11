import { useMemo, useState } from "react";

type Options = {
	defaultValue?: number;
	step?: number;
	min?: number;
	max?: number;
};

export const useNumber = ({
	defaultValue = 0,
	step = 1,
	min = Number.NEGATIVE_INFINITY,
	max = Number.POSITIVE_INFINITY,
}: Options = {}) => {
	const [value, setValue] = useState(defaultValue);

	const controller = useMemo(
		() => ({
			put: setValue,
			increment: () => setValue((value) => Math.min(value + step, max)),
			decrement: () => setValue((value) => Math.max(value - step, min)),
		}),
		[step, min, max],
	);
	return [value, controller] as [number, typeof controller];
};
