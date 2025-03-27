import { createSlice } from "@reduxjs/toolkit";

export type ISettingsState = {
	enableHapticFeedback: boolean;
};

const initialState: ISettingsState = {
	enableHapticFeedback: true,
};

export const settings = createSlice({
	name: "settings",
	initialState,
	reducers: {},
	selectors: {},
});

// export const {} = settings.actions;

// export const {} = settings.selectors;

export default settings.reducer;
