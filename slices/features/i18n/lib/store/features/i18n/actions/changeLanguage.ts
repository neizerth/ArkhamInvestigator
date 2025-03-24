import {
	DEFAULT_LANGUAGE,
	I18N_NAMESAPCE,
	i18next,
	translations,
} from "@features/i18n/config";
import type { AppThunkCreator } from "@shared/lib";
import { selectLanguage, setLanguage } from "../i18n";
import { loadTranslation } from "./loadTranslation";

export const changeLanguage: AppThunkCreator =
	(language: string) => (dispatch, getState) => {
		const state = getState();
		const currentLanguage = selectLanguage(state);
		if (language === currentLanguage) {
			return;
		}
		if (language === DEFAULT_LANGUAGE) {
			dispatch(setLanguage(language));
			i18next.changeLanguage(language);
			i18next.addResourceBundle(language, I18N_NAMESAPCE, translations.en);
			return;
		}
		dispatch(loadTranslation(language));
	};
