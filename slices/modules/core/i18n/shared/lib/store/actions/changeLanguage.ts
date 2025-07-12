import type { AppThunk } from "@shared/model";
import {
	DEFAULT_LANGUAGE,
	I18N_NAMESAPCE,
	i18next,
	translations,
} from "../../../../shared/config";
import { selectLanguage, setLanguage } from "../i18n";
import { loadTranslation } from "./translations/loadTranslation";

export const changeLanguage =
	(language: string | null): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentLanguage = selectLanguage(state);

		if (!language || language === currentLanguage) {
			return;
		}
		if (language === DEFAULT_LANGUAGE) {
			dispatch(setLanguage(language));
			i18next.addResourceBundle(language, I18N_NAMESAPCE, translations.en);
			i18next.changeLanguage(language);
		}

		dispatch(loadTranslation(language));
	};
