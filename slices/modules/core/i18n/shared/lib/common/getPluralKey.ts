import { last } from "ramda";

const fixedKeys = ["zero", "one", "two", "many", "few", "other", "default"];

export const getPluralKey = (key: string) => {
	const parts = key.split("_");
	const plural = last(parts);

	if (!plural) {
		return false;
	}

	if (fixedKeys.includes(plural) || /^\d+$/.test(plural)) {
		const base = parts.slice(0, -1).join("_");
		return {
			base,
			plural,
		};
	}

	return false;
};
