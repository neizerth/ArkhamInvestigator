import { createSlice } from "@reduxjs/toolkit";

export type SettingsState = {
	enableHapticFeedback: boolean;
};

const initialState: SettingsState = {
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
