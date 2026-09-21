import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type AppState = {
	appLoaded: boolean;
};

const initialState: AppState = {
	appLoaded: false,
};

const state = createSliceState(initialState);

export const app = createSlice({
	name: "app",
	...state,
});

export const { setAppLoaded } = app.actions;

export const { selectAppLoaded } = app.selectors;

export default app.reducer;
