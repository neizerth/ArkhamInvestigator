import type { AppThunkCreator } from "@shared/lib";
import { setLoadingLanguage } from "../i18n";
import { loadTranslations } from "./loadTranslations";


export const changeLanguage: AppThunkCreator = (language: string) =>
  (dispatch) => {
      
    dispatch(setLoadingLanguage(language));
    dispatch(loadTranslations(language));
  }