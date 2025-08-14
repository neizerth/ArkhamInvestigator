import { createSlice } from "@reduxjs/toolkit";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { createSliceState } from "redux-toolkit-helpers";
import { DEFAULT_LANGUAGE } from "../../config";

export type I18NState = {
	language: string | null;
	availableLanguages: string[];
	investigatorTranslations: ArkhamDBInvestigatorCard[];
};

const initialState: I18NState = {
	language: null,
	availableLanguages: [DEFAULT_LANGUAGE],
	investigatorTranslations: [],
};

export const i18n = createSlice({
	name: "i18n",
	...createSliceState(initialState),
});

export const {
	setLanguage,
	setAvailableLanguages,
	setInvestigatorTranslations,
} = i18n.actions;

export const {
	selectLanguage,
	selectAvailableLanguages,
	selectInvestigatorTranslations,
} = i18n.selectors;

export default i18n.reducer;
