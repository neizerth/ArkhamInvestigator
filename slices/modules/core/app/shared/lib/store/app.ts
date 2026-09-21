import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type AppState = {
	appReady: boolean;
	appLoaded: boolean;
};

const initialState: AppState = {
	appReady: false,
	appLoaded: false,
};

const state = createSliceState(initialState);

export const app = createSlice({
	name: "app",
	...state,
});

export const { setAppReady, setAppLoaded } = app.actions;

export const { selectAppReady, selectAppLoaded } = app.selectors;

export default app.reducer;
