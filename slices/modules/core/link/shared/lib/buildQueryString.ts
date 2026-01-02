export const buildQueryString = (qs: Record<string, string>) => {
	return Object.entries(qs)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
};
