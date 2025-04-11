export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const loadJSON = async <T>(url: string) => {
	const response = await fetch(url);

	const json: T = await response.json();
	return json;
};
