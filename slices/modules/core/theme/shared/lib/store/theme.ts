import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { defaultTheme } from "../../config/theme";
import type { Theme } from "../../model";

export type ThemeState = {
	theme: Theme;
	artworkUrl: string | null;
};

const initialState: ThemeState = {
	theme: defaultTheme,
	artworkUrl: null,
};

const state = createSliceState(initialState);

export const theme = createSlice({
	name: "theme",
	...state,
});

export const { setTheme, setArtworkUrl } = theme.actions;

export const { selectTheme, selectArtworkUrl } = theme.selectors;

export default theme.reducer;
