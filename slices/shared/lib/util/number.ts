export const sign = (x: number) => (x < 0 ? -1 : 1);

export const minMax = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(value, max));

export const round = (value: number, accuracy: number) => {
	const flooring = Math.floor(value);
	const diff = value - flooring;
	const result = diff >= accuracy ? flooring + 1 : flooring;

	return result;
};

export const safeIncrement =
	(maxValue = Number.POSITIVE_INFINITY) =>
	(value = 0) =>
		Math.min(value + 1, maxValue);
export const safeDecrement =
	(minValue = Number.NEGATIVE_INFINITY) =>
	(value = 0) =>
		Math.max(value - 1, minValue);

export const rangeStep = (min: number, max: number, step: number) => {
	const data = [];
	for (let i = min; i < max; i += step) {
		data.push(i);
	}
	return data;
};
