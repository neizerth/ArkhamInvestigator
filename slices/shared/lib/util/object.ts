export const isObject = (data: unknown): data is object => {
	return Boolean(data) && typeof data === "object";
};

export function hasProp<T extends object, K extends PropertyKey>(
	data: T,
	prop: K,
): data is T & Record<K, unknown>;

export function hasProp<K extends PropertyKey>(
	data: unknown,
	prop: K,
): data is Record<K, unknown>;

export function hasProp(data: unknown, prop: PropertyKey): boolean {
	return typeof data === "object" && data !== null && prop in data;
}
