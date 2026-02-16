import { nameTranslations } from "@assets/i18n/name";
import { getRandomItem } from "@shared/lib/util";

export const getDefaultNickname = (language: string) => {
	const translations = nameTranslations[language] ?? nameTranslations.en;

	const prefix = getRandomItem(translations.prefix);
	const postfix = getRandomItem(translations.postfix);
	return `${prefix} ${postfix}`;
};
