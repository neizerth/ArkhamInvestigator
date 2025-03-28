import { range } from "ramda";

export const getValueOffsets = (count: number, itemHeight: number) =>
	range(0, count).map((i) => i * itemHeight);
