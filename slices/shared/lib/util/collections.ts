import { includesBy } from "./criteria";

export const toggleBy = <T>(
	hasItem: (item: T) => boolean,
	item: T,
	data: T[],
) =>
	includesBy(hasItem, data)
		? data.filter((item) => !hasItem(item))
		: [...data, item];

export const safeIndexOf = <T>(item: T | undefined, data: T[]) =>
	item !== undefined ? data.indexOf(item) : -1;

export const arrayIf = <T>(condition: boolean, item: T) =>
	condition ? [item] : [];
