import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { HapticMode } from "../../model";

export type HapticState = {
	hapticMode: HapticMode | null;
};

const initialState: HapticState = {
	hapticMode: "default",
};

export const haptic = createSlice({
	name: "haptic",
	...createSliceState(initialState),
});

export const { setHapticMode } = haptic.actions;

export const { selectHapticMode } = haptic.selectors;

export default haptic.reducer;
