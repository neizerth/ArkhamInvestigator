import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type DeviceState = {
	keepAwakeEnabled: boolean;
};

const initialState: DeviceState = {
	keepAwakeEnabled: false,
};

const state = createSliceState(initialState);

export const assets = createSlice({
	name: "device",
	...state,
});

export const { setKeepAwakeEnabled } = assets.actions;

export const { selectKeepAwakeEnabled: selectKeepAwake } = assets.selectors;

export default assets.reducer;
