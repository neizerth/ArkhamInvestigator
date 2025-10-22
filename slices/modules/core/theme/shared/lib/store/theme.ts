import { createSlice } from "@reduxjs/toolkit";
import { ASSET_URL } from "@shared/config";
import { Platform } from "react-native";
import { createSliceState } from "redux-toolkit-helpers";
import { defaultTheme } from "../../config/theme";
import type { Theme } from "../../model";

const artworkUrl = Platform.OS === "ios" ? null : ASSET_URL;

export type ThemeState = {
	theme: Theme;
	artworkUrl: string | null;
};

const initialState: ThemeState = {
	theme: defaultTheme,
	artworkUrl,
};

const state = createSliceState(initialState);

export const theme = createSlice({
	name: "theme",
	...state,
});

export const { setTheme, setArtworkUrl } = theme.actions;

export const { selectTheme, selectArtworkUrl } = theme.selectors;

export default theme.reducer;
