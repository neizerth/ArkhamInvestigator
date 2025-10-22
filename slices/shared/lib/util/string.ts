export const capitalize = <T extends string>(text: string) =>
	(text[0].toUpperCase() + text.slice(1)) as Capitalize<T>;

export const signedNumber = (value: number, zeroSign = "") => {
	if (value === 0) {
		return `${zeroSign}${value}`;
	}

	return value > 0 ? `+${value}` : value.toString();
};

export const snakeCase = (text: string) =>
	text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const hyphens2camelCase = (text: string) =>
	text.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

export const getBreaksCount = (text: string) => text.split("\n").length;

export const stripTags = (html: string) =>
	html.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");

const urlRegex =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const isUrl = (text: string) => {
	return urlRegex.test(text);
};

export const space2Nbsp = (text: string) => {
	return text.replace(/(\s+)/g, "\u00A0");
};
