import type { AppThunkCreator } from "@shared/lib";
import { selectLoadedLanguages, setLanguage, setLoadingLanguage } from "../i18n";
import { i18n } from "@features/i18n/config";
import { loadTranslations } from "./loadTranslations";


export const changeLanguage: AppThunkCreator = (language: string) =>
  (dispatch, getState) => {
    const state = getState();
    const loadedLanguages = selectLoadedLanguages(state);

    if (loadedLanguages.includes(language)) {
      i18n.changeLanguage(language);
      dispatch(setLanguage(language));
      return;
    }

    dispatch(setLoadingLanguage(language));
    dispatch(loadTranslations(language));
  }