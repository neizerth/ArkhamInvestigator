import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { APP_VERSION } from "@shared/config/app";
import { HapticPatternType } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IAppState = {
	loading: boolean
	version: string
	hapticsFeedbackType: HapticPatternType | false
};

const initialState: IAppState = {
	loading: true,
	version: APP_VERSION,
	hapticsFeedbackType: 'clockTick'
};

export const app = createSlice({
	name: "app",
	...createSliceState(initialState),
});

export const { 
	setLoading,
	setHapticsFeedbackType
} = app.actions;

export const { 
	selectLoading,
	selectHapticsFeedbackType
} = app.selectors;

export default app.reducer;
