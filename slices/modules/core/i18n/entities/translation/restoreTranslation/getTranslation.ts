import { translations } from "@assets/i18n/core";
import { DEFAULT_LANGUAGE } from "@modules/core/i18n/shared/config";
import {
	StoreTranslation,
	mergeTranslations,
} from "@modules/core/i18n/shared/lib";

export const getTranslation = async (language: string) => {
	if (language === DEFAULT_LANGUAGE) {
		return translations.en;
	}

	const translation = await StoreTranslation.load(language);

	if (!translation) {
		return;
	}

	const localTranslation = translations?.[language] || {};

	return mergeTranslations(translation, localTranslation);
};
