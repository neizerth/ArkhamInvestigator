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

export const splitIntoGroups = <T>(
	data: readonly T[],
	groupSize: number,
): T[][] => {
	const groups: T[][] = [];
	for (let i = 0; i < data.length; i += groupSize) {
		groups.push(data.slice(i, i + groupSize));
	}
	return groups;
};
