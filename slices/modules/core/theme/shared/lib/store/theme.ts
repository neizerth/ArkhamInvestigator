import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { defaultTheme } from "../../config/theme";
import type { Theme } from "../../model";

export type ThemeState = {
	theme: Theme;
};

const initialState: ThemeState = {
	theme: defaultTheme,
};

const state = createSliceState(initialState);

export const theme = createSlice({
	name: "theme",
	...state,
});

export const { setTheme } = theme.actions;

export const { selectTheme } = theme.selectors;

export default theme.reducer;
