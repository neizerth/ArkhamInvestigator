import type { AppThunkCreator } from "@shared/lib";
import { selectLanguage } from "../i18n";
import { loadTranslation } from '../../../../storage/translation';
import { DEFAULT_LANGUAGE, I18N_NAMESAPCE, i18next, translations } from "@features/i18n/config";
import { loadTranslationData } from "./loadTranslation";
import { changeLanguage } from "./changeLanguage";

export const restoreTranslation: AppThunkCreator = () => 
  async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);

    if (language === DEFAULT_LANGUAGE) {
      return
    }

    try {
      const data = await loadTranslation();
      const appTranslation = translations[language] || {};
      const translation = {
        ...data,
        ...appTranslation 
      }

      i18next.addResourceBundle(
        language, 
        I18N_NAMESAPCE, 
        translation
      )
      i18next.changeLanguage(language);
    }
    catch (error) {
      dispatch(changeLanguage(language));
    }
  }