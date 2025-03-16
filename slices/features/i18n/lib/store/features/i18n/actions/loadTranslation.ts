import type { AppThunkCreator } from "@shared/lib";
import { setLoadingLanguage } from "../i18n";
import { fetchTranslationData } from "./fetchTranslationData";

export const loadTranslation: AppThunkCreator = (language: string) => (dispatch) => {
  dispatch(setLoadingLanguage(language));
  dispatch(fetchTranslationData(language));
}