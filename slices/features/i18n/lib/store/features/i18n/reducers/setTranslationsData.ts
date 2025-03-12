import type { ArkhamDivider } from "arkham-divider-data";
import type { I18NReducer } from "../i18n.types";
import { pick } from "ramda";
import { i18n, I18N_NAMESAPCE } from "@features/i18n/config";

export const setTranslationsData: I18NReducer<ArkhamDivider.Translation> = (state, { payload }) => {
  const { loadingLanguage, loadedLanguages } = state;

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

  const bundle = Object.assign({}, Object.values(data));

  const deep = true;
  const overwrite = true;
  
  i18n.addResourceBundle(
    loadingLanguage, 
    I18N_NAMESAPCE, 
    bundle, 
    deep, 
    overwrite
  );

  return {
    ...state,
    language: loadingLanguage,
    loadingLanguage: null,
    loadedLanguages: [
      ...loadedLanguages,
      loadingLanguage
    ]
  };
}
