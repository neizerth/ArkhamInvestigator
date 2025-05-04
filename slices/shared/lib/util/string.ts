export const capitalize = <T extends string>(text: string) =>
	(text[0].toUpperCase() + text.slice(1)) as Capitalize<T>;

export const signedNumber = (value: number) =>
	value > 0 ? `+${value}` : value.toString();

export const snakeCase = (text: string) =>
	text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const hyphens2camelCase = (text: string) =>
	text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
