import type { Translation } from "../../model";
import { getPluralKey } from "./getPluralKey";

export const mergeTranslations = (t1: Translation, t2: Translation) => {
	const sourcePluralKeys = Object.keys(t2)
		.map((key) => {
			const plural = getPluralKey(key);
			return plural !== false ? plural.base : "";
		})
		.filter((x) => x !== "");

	const base = Object.entries(t1).reduce(
		(acc, [key, value]) => {
			const pluralKey = getPluralKey(key);

			const skip = pluralKey && sourcePluralKeys.includes(pluralKey.base);

			if (skip) {
				return acc;
			}

			acc[key] = value;
			return acc;
		},
		{ ...t2 },
	);

	const result = {
		...base,
		...t2,
	};

	return result;
};
