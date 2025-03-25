import { createSlice } from "@reduxjs/toolkit";
import { APP_VERSION } from "@shared/config/app";
import { createSliceState } from "redux-toolkit-helpers";

export type IAppState = {
	loading: boolean;
	version: string;
};

const initialState: IAppState = {
	loading: true,
	version: APP_VERSION,
};

export const app = createSlice({
	name: "app",
	...createSliceState(initialState),
});

export const { setLoading } = app.actions;

export const { selectLoading } = app.selectors;

export default app.reducer;
