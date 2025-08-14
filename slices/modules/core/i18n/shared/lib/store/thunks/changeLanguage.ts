import type { AppThunk } from "@shared/model";
import { DEFAULT_LANGUAGE } from "../../../config";
import { selectLanguage, setLanguage } from "../i18n";

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

			// setI18NTranslation({
			// 	language,
			// 	translation: translations.en,
			// });
		}

		// dispatch(loadTranslation(language));
	};
