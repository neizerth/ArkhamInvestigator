import type { AppThunkCreator } from "@shared/lib";
import { selectLanguage, setLoadingLanguage } from "../i18n";
import { loadStoreTranslation } from '../../../../storage/translation';
import { DEFAULT_LANGUAGE, I18N_NAMESAPCE, i18next, translations } from "@features/i18n/config";
import { changeLanguage } from "./changeLanguage";
import { fetchTranslationData, loadTranslation } from "./loadTranslation";

export const restoreTranslation: AppThunkCreator = () => 
  async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);

    if (language === DEFAULT_LANGUAGE) {
      return
    }

    try {
      const data = await loadStoreTranslation();
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

      dispatch(loadTranslation(language));
    }
    catch (error) {
      dispatch(loadTranslation(language));
    }
  }