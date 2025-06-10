import { createSelector } from "@reduxjs/toolkit";
import { getDefaultLanguage } from "../../../../detect";
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
