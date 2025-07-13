export const isObject = (data: unknown): data is object => {
	return Boolean(data) && typeof data === "object";
};
