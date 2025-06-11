import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import { APP_VERSION } from "../../../../config/app";

export type AppState = {
	loading: boolean;
	version: string;
	outdated: boolean;
	keepAwake: boolean;
};

const initialState: AppState = {
	loading: true,
	version: APP_VERSION,
	outdated: false,
	keepAwake: false,
};

export const app = createSlice({
	name: "app",
	...createSliceState(initialState),
});

export const {
	setLoading,
	setOutdated: setAppOutdated,
	setKeepAwake,
} = app.actions;

export const {
	selectLoading,
	selectOutdated: selectAppOutdated,
	selectKeepAwake,
} = app.selectors;

export default app.reducer;
