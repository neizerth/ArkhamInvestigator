import { createSlice } from "@reduxjs/toolkit";
import type { NavigationModeInfo } from "react-native-navigation-mode";
import { createSliceState } from "redux-toolkit-helpers";

export type DeviceState = {
	keepAwakeEnabled: boolean;
	navbarHeight: number;
	navigationMode: NavigationModeInfo | null;
};

const initialState: DeviceState = {
	keepAwakeEnabled: false,
	navbarHeight: 0,
	navigationMode: null,
};

const state = createSliceState(initialState);

export const assets = createSlice({
	name: "device",
	...state,
});

export const { setKeepAwakeEnabled, setNavbarHeight, setNavigationMode } =
	assets.actions;

export const {
	selectKeepAwakeEnabled: selectKeepAwake,
	selectNavbarHeight,
	selectNavigationMode,
} = assets.selectors;

export default assets.reducer;
