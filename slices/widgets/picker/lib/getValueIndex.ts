import { safeIndexOf } from "@shared/lib";

type Options = {
	value?: number;
	data: number[];
};
export const getValueIndex = ({ value, data }: Options) =>
	Math.max(safeIndexOf(value, data), 0);
