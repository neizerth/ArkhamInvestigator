import { safeIndexOf } from "@shared/lib";

export const getValueIndex = (value: number | undefined, data: number[]) =>
	Math.max(safeIndexOf(value, data), 0);
