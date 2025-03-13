import type { ArkhamDivider } from "arkham-divider-data";
import type { I18NReducer } from "../i18n.types";
import { pick } from "ramda";
import { i18next, I18N_NAMESAPCE, translations, DEFAULT_LANGUAGE } from "@features/i18n/config";

export const setTranslationsData: I18NReducer<ArkhamDivider.Translation> = (state, { payload }) => {
  const { loadingLanguage, language } = state;

  if (!loadingLanguage) {
    return state;
  }

  const data = pick([
    'encounterSets',
    'campaigns',
    'scenarios',
    'stories',
    'common',
    'investigators'
  ], payload);

  const translation = translations[loadingLanguage] || {};

  const bundle = Object.assign(
    {}, 
    ...Object.values(data),
    translation
  )
  
  i18next.addResourceBundle(
    loadingLanguage, 
    I18N_NAMESAPCE, 
    bundle
  );

  i18next.changeLanguage(loadingLanguage);

  if (language !== DEFAULT_LANGUAGE) {
    i18next.removeResourceBundle(language, I18N_NAMESAPCE);
  }

  return {
    ...state,
    language: loadingLanguage,
    loadingLanguage: null
  };
}
