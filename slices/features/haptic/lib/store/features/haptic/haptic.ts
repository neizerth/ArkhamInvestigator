import { createSlice } from "@reduxjs/toolkit";
import type { HapticFeedbackType, HapticMode } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IHapticState = {
	hapticMode: HapticMode;
};

const initialState: IHapticState = {
	hapticMode: "default",
};

export const haptic = createSlice({
	name: "haptic",
	...createSliceState(initialState),
});

export const { setHapticMode } = haptic.actions;

export const { selectHapticMode } = haptic.selectors;

export default haptic.reducer;
