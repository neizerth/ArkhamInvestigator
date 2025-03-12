import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadGameTranslationData } from "@shared/api";
import type { AppThunkCreator } from "@shared/lib";
import { selectLanguage, selectLoadedLanguages, setLoadingLanguage } from "../i18n";

export const loadTranslationsThunk = createAsyncThunk(
  'app/loadTranslationsData',
  loadGameTranslationData
)

export const loadTranslations: AppThunkCreator = (language: string) =>
  (dispatch, getState) => {
    const state = getState();
    const loadedLanguages = selectLoadedLanguages(state);
    const language = selectLanguage(state);

    if (loadedLanguages.includes(language)) {
      return;
    }

    dispatch(setLoadingLanguage(language));
    dispatch(loadTranslationsThunk(language));
  }