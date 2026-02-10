import { nameTranslations } from "@assets/i18n/name";
import { getRandomItem } from "@shared/lib/util";

export const getDefaultNickname = (language: string) => {
	const translations = nameTranslations[language] ?? nameTranslations.en;

	const adjective = getRandomItem(translations.adjective);
	const noun = getRandomItem(translations.noun);
	return `${adjective} ${noun}`;
};
