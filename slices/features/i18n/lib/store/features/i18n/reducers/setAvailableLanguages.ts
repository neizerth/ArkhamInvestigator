import type { ArkhamDivider } from "arkham-divider-data";
import type { I18NReducer } from "../i18n.types";
import { includes, reject } from "ramda";


export const setAvailableLanguages: I18NReducer<ArkhamDivider.Core> = (state, { payload }) => {
  const { languages } = payload;
  const availableLanguages = reject(
    includes('zh-cn'),
    languages
  )

  return {
    ...state,
    availableLanguages
  }
}