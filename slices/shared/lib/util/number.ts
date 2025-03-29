export const sign = (x: number) => (x < 0 ? -1 : 1);

export const minMax = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(value, max));

export const round = (value: number, accuracy: number) =>
	Math.round(value - 0.5 + accuracy);
