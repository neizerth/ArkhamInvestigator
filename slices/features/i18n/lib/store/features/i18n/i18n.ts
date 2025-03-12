import { DEFAULT_LANGUAGE } from '@features/i18n/config';
import { createSlice } from '@reduxjs/toolkit';
import { loadCoreData } from '@shared/lib/store';
import { createSliceState } from 'redux-toolkit-helpers';
import { loadTranslations } from './actions';
import { pick } from 'ramda';
import { setAvailableLanguages, setTranslationsData } from './reducers';

export type II18nState = {
  language: string
  availableLanguages: string[]
  loadedLanguages: string[]
  loadingLanguage: string | null
}

const initialState: II18nState = {
  language: DEFAULT_LANGUAGE,
  availableLanguages: [DEFAULT_LANGUAGE],
  loadedLanguages: [DEFAULT_LANGUAGE],
  loadingLanguage: null
};

export const i18n = createSlice({
  name: 'i18n',
  ...createSliceState(initialState),
  extraReducers(builder) {
    builder
      .addCase(loadCoreData.fulfilled, setAvailableLanguages)
      .addCase(loadTranslations.fulfilled, setTranslationsData)
  }
});

export const {
  setLanguage,
  setLoadedLanguages,
  setLoadingLanguage
} = i18n.actions;

export const {
  selectLanguage,
  selectLoadedLanguages,
} = i18n.selectors;

export default i18n.reducer;