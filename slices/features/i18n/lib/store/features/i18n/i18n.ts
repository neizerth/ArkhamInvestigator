import { DEFAULT_LANGUAGE } from '../../../../config';
import { createSlice } from '@reduxjs/toolkit';
import { loadCoreData } from '../../../../../../shared/lib/store/features/app/actions';
import { createSliceState } from 'redux-toolkit-helpers';
import { fetchTranslationData } from './actions/fetchTranslationData';
import { setAvailableLanguages } from './reducers/setAvailableLanguages';
import { setTranslationsData } from './reducers/setTranslationsData'

export type II18nState = {
  language: string
  availableLanguages: string[]
  loadingLanguage: string | null
}

const initialState: II18nState = {
  language: DEFAULT_LANGUAGE,
  availableLanguages: [DEFAULT_LANGUAGE],
  loadingLanguage: null
};

export const i18n = createSlice({
  name: 'i18n',
  ...createSliceState(initialState),
  extraReducers(builder) {
    builder
      .addCase(loadCoreData.fulfilled, setAvailableLanguages)
      .addCase(fetchTranslationData.fulfilled, setTranslationsData)
  }
});

export const {
  setLanguage,
  setLoadingLanguage
} = i18n.actions;

export const {
  selectLanguage,
  selectAvailableLanguages
} = i18n.selectors;

export default i18n.reducer;