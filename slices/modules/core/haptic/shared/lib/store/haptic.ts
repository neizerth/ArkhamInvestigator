import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { HapticMode } from "../../model";

export type HapticState = {
	hapticMode?: HapticMode;
	hapticEffectsSupported: boolean | null;
};

const initialState: HapticState = {
	hapticMode: "default",
	hapticEffectsSupported: null,
};

export const haptic = createSlice({
	name: "haptic",
	...createSliceState(initialState),
});

export const { setHapticMode, setHapticEffectsSupported } = haptic.actions;

export const { selectHapticMode, selectHapticEffectsSupported } =
	haptic.selectors;

export default haptic.reducer;
