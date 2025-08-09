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

export const getLoopNext = <T>(data: T[], index: number) => {
	const nextIndex = (index + 1) % data.length;

	return data[nextIndex];
};

export const getLoopPrev = <T>(data: T[], index: number) => {
	const prevIndex = index === 0 ? data.length - 1 : index - 1;
	return data[prevIndex];
};
