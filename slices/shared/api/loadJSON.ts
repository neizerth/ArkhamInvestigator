export const loadJSON = async <T>(url: string) => {
	const response = await fetch(url);

	const json: T = await response.json();
	return json;
};
