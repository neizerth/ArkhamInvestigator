import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { DEFAULT_LANGUAGE } from "../../../../config";
import { fetchTranslationData } from "./actions/fetchTranslationData";
import { setTranslationsData } from "./reducers/setTranslationsData";

export type II18nState = {
	language: string | null;
	availableLanguages: string[];
	loadingLanguage: string | null;
};

const initialState: II18nState = {
	language: null,
	availableLanguages: [DEFAULT_LANGUAGE],
	loadingLanguage: null,
};

export const i18n = createSlice({
	name: "i18n",
	...createSliceState(initialState),
	extraReducers(builder) {
		builder.addCase(fetchTranslationData.fulfilled, setTranslationsData);
	},
});

export const { setLanguage, setLoadingLanguage, setAvailableLanguages } =
	i18n.actions;

export const { selectLanguage, selectAvailableLanguages } = i18n.selectors;

export default i18n.reducer;
