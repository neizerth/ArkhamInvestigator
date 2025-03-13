import type { ArkhamDivider } from "arkham-divider-data";
import type { I18NReducer } from "../i18n.types";

export const setAvailableLanguages: I18NReducer<ArkhamDivider.Core> = (state, { payload }) => {
  return {
    ...state,
    availableLanguages: payload.languages
  }
}