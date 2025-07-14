import type { RootState } from "@shared/model";
import { getDefaultLanguage } from "../../detect";
import { selectAvailableLanguages, selectLanguage } from "../i18n";

export const selectCurrentLanguage = (state: RootState) => {
	const language = selectLanguage(state);
	const availableLanguages = selectAvailableLanguages(state);
	if (language) {
		return language;
	}
	return getDefaultLanguage(availableLanguages);
};
