import type { ArkhamDivider } from "arkham-divider-data";
import type { I18NReducer } from "../i18n.types";
import { pick } from "ramda";
import { i18next, I18N_NAMESAPCE, translations, DEFAULT_LANGUAGE } from "@features/i18n/config";
import { storage } from "@features/storage";
import { saveStoreTranslation } from "@features/i18n/lib/storage";

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

  const appTranslation = translations[loadingLanguage] || {};

  const bundle = Object.assign(
    {}, 
    ...Object.values(data),
    appTranslation
  )
  
  i18next.addResourceBundle(
    loadingLanguage, 
    I18N_NAMESAPCE, 
    bundle
  );
  i18next.changeLanguage(loadingLanguage);
  
  saveStoreTranslation(bundle);

  if (language !== loadingLanguage) {
    i18next.removeResourceBundle(language, I18N_NAMESAPCE);
  }

  return {
    ...state,
    language: loadingLanguage,
    loadingLanguage: null
  };
}
