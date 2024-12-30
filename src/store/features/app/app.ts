import { fetchCoreData, fetchLanguageData } from '@/api/arkhamDivider';
import { AppThunk } from '@/store';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { addTranslatedStories, selectLoadedTranslations, setAvailableLanguages, setLoadedTranslations } from '../language/language';
import { setIcons } from '../icons/icons';
import { createSliceSetter } from '@/features/slice/createSliceSetter';
import { createSliceSelector } from '@/features/slice/createSliceSelector';
import { setStories } from '../stories/stories';
import { DEFAULT_LANGUAGE } from '@/config/i18n';
import { setCoreTranslations, setCustomTranslations } from '../i18n/i18n';
import { withInvestigators } from '../stories/criteria';

export type IAppState = {
  loading: boolean
}

const initialState: IAppState = {
  loading: true
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: createSliceSetter('loading')
  },
  selectors: {
    selectLoading: createSliceSelector('loading')
  }
});

export const loadAppData: ActionCreator<AppThunk> = () => async dispatch => {
  dispatch(setLoading(true));
  const {
    stories,
    icons,
    languages
  } = await fetchCoreData();

  const storiesWithInvestigators = stories.filter(withInvestigators);

  dispatch(setLoadedTranslations([DEFAULT_LANGUAGE]));
  dispatch(setAvailableLanguages(languages));
  dispatch(setIcons(icons));
  dispatch(setLoading(false));
  dispatch(setStories(storiesWithInvestigators));
}

export const loadAppTranslations: ActionCreator<AppThunk> = (language: string) => async (dispatch, getState) => {
  const state = getState();
  
  const loadedTranslations = selectLoadedTranslations(state);

  if (loadedTranslations.includes(language)) {
    return;
  }
  
  const {
    translatedStories,
    campaigns,
    scenarios,
    encounterSets,
    stories,
    investigators,
    common,
    custom
  } = await fetchLanguageData(language);

  // translations[language as keyof translations];
  // const translationKey = language as keyof typeof translations;

  const mapping = {
    ...encounterSets,
    ...campaigns,
    ...scenarios,
    ...stories,
    ...common,
    ...investigators
  };
  
  dispatch(setCoreTranslations(language, mapping));
  dispatch(setCustomTranslations(language, custom));
  dispatch(addTranslatedStories(language, translatedStories));
  dispatch(setLoadedTranslations([
    ...loadedTranslations,
    language
  ]))
}


export const {
  setLoading
} = app.actions;

export const {
  selectLoading
} = app.selectors;

export default app.reducer;