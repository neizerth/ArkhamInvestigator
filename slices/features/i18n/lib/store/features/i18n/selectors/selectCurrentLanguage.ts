import { getDefaultLanguage } from "@features/i18n/lib/detect";
import { createSelector } from "@reduxjs/toolkit";
import { selectAvailableLanguages, selectLanguage } from "../i18n";

export const selectCurrentLanguage = createSelector(
	[selectLanguage, selectAvailableLanguages],
	(language, avaliableLanguages) => {
		if (language) {
			return language;
		}

		return getDefaultLanguage(avaliableLanguages);
	},
);
