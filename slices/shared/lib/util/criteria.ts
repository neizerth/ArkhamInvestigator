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

		const comparsion = keys.every((key) => {
			const value = criteria[key];

			const dataValue = data[key];

			if (typeof dataValue === "undefined") {
				return true;
			}
			const comparsion = value === dataValue;

			return comparsion;
		});

		return comparsion;
	};

export const isNotEmpty = <T>(
	value?: T,
): value is Exclude<T, null | undefined> => {
	return value !== undefined && value !== null;
};
