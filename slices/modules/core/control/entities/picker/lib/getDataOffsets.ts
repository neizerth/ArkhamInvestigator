import { range } from "ramda";

export const getDataOffsets = (count: number, itemHeight: number) =>
	range(0, count).map((i) => Math.round(i * itemHeight));
