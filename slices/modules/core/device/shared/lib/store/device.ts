import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type DeviceState = {
	keepAwake: boolean;
};

const initialState: DeviceState = {
	keepAwake: false,
};

const state = createSliceState(initialState);

export const assets = createSlice({
	name: "device",
	...state,
});

export const { setKeepAwake: setKeepAwakeInternal } = assets.actions;

export const { selectKeepAwake } = assets.selectors;

export default assets.reducer;
