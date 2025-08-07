import { safeIndexOf } from "@shared/lib";

type Options<T> = {
	value?: T;
	data: T[];
};
export const getValueIndex = <T>({ value, data }: Options<T>) =>
	Math.max(safeIndexOf(value, data), 0);
