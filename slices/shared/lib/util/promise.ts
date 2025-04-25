export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const runLater = (callback: () => void) => delay(0).then(callback);

export const loadJSON = async <T>(url: string) => {
	const response = await fetch(url);

	const json: T = await response.json();
	return json;
};

export const delayValue = <T>(ms: number, value: T) =>
	delay(ms).then(() => value);
