import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { HapticMode } from "../../../../model";

export type IHapticState = {
	hapticMode: HapticMode | null;
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
