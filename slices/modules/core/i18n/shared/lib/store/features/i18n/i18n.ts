import { createSlice } from "@reduxjs/toolkit";
import type { ArkhamDBInvestigatorCard } from "@shared/model/api/game/arkhamDB";
import { createSliceState } from "redux-toolkit-helpers";
import { DEFAULT_LANGUAGE } from "../../../../../shared/config";
import { fetchTranslationData } from "./actions/translations/fetchTranslationData";
import { setTranslationsData } from "./reducers/setTranslationsData";

export type I18nState = {
	language: string | null;
	availableLanguages: string[];
	loadingLanguage: string | null;
	investigatorTranslations: ArkhamDBInvestigatorCard[];
};

const initialState: I18nState = {
	language: null,
	availableLanguages: [DEFAULT_LANGUAGE],
	loadingLanguage: null,
	investigatorTranslations: [],
};

export const i18n = createSlice({
	name: "i18n",
	...createSliceState(initialState),
	extraReducers(builder) {
		builder.addCase(fetchTranslationData.fulfilled, setTranslationsData);
	},
});

export const {
	setLanguage,
	setLoadingLanguage,
	setAvailableLanguages,
	setInvestigatorTranslations,
} = i18n.actions;

export const {
	selectLanguage,
	selectAvailableLanguages,
	selectInvestigatorTranslations,
} = i18n.selectors;

export default i18n.reducer;
