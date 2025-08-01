import { propEq } from "ramda";

export const propIncludes =
	<T, K extends keyof T>(prop: K, values: T[K][]) =>
	(data: T) =>
		values.includes(data[prop]);

export const includesBy = <T>(comparator: (item: T) => boolean, values: T[]) =>
	Boolean(values.find(comparator));

export const whereId = <T>(value: T) => propEq(value, "id");

export const idIncludes = <T extends { id: string }>(values: string[]) =>
	propIncludes<T, "id">("id", values);

export const partiallyEquals =
	<T>(criteria: Partial<T>) =>
	(data: T) => {
		type Key = keyof T;
		const keys = Object.keys(criteria) as Key[];
		return keys.every((key) => {
			const value = criteria[key];

			if (typeof value === "undefined") {
				return true;
			}

			return value === data[key];
		});
	};
