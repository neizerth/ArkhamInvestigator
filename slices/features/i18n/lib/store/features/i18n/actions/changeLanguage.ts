import type { AppThunkCreator } from "@shared/lib";
import { setLanguage, setLoadingLanguage } from "../i18n";
import { loadTranslationData } from "./loadTranslation";
import { DEFAULT_LANGUAGE, i18next } from "@features/i18n/config";


export const changeLanguage: AppThunkCreator = (language: string) =>
  (dispatch) => {
    if (language === DEFAULT_LANGUAGE) {
      dispatch(setLanguage(language));
      i18next.changeLanguage(language);
      return;
    }
    dispatch(setLoadingLanguage(language));
    dispatch(loadTranslationData(language));
  }