import type { AppThunkCreator } from "@shared/model";
import {
	DEFAULT_LANGUAGE,
	I18N_NAMESAPCE,
	i18next,
	translations,
} from "../../../../../config";
import { selectLanguage, setLanguage } from "../i18n";
import { loadTranslation } from "./translations/loadTranslation";

export const changeLanguage: AppThunkCreator =
	(language: string | null) => (dispatch, getState) => {
		const state = getState();
		const currentLanguage = selectLanguage(state);

		if (language === currentLanguage) {
			return;
		}
		if (language === DEFAULT_LANGUAGE) {
			dispatch(setLanguage(language));
			i18next.addResourceBundle(language, I18N_NAMESAPCE, translations.en);
			i18next.changeLanguage(language);
		}
		dispatch(loadTranslation(language));
	};
