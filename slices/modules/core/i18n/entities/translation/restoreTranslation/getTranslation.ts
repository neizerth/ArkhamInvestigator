import {
	DEFAULT_LANGUAGE,
	translations,
} from "@modules/core/i18n/shared/config";
import { StoreTranslation } from "@modules/core/i18n/shared/lib";

export const getTranslation = async (language: string) => {
	if (language === DEFAULT_LANGUAGE) {
		return translations.en;
	}

	return await StoreTranslation.load(language);
};
