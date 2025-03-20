export const propIncludes =
	<T, K extends keyof T>(prop: K, values: T[K][]) =>
	(data: T) =>
		values.includes(data[prop]);

export const includesBy = <T>(comparator: (item: T) => boolean, values: T[]) =>
	Boolean(values.find(comparator));
