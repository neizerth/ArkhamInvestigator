import { createSlice } from "@reduxjs/toolkit";
import type * as ScreenOrientation from "expo-screen-orientation";
import type { NavigationModeInfo } from "react-native-navigation-mode";
import type { EdgeInsets } from "react-native-safe-area-context";
import { createSliceState } from "redux-toolkit-helpers";
import type { DeviceOrientation } from "../../model";

export type DeviceState = {
	keepAwakeEnabled: boolean;
	navbarHeight: number;
	statusBarHeight: number;
	safeAreaInsets: EdgeInsets;
	screenOrientation: ScreenOrientation.Orientation | null;
	screenOrientationType: DeviceOrientation | null;
	navigationMode: NavigationModeInfo | null;
};

const initialState: DeviceState = {
	keepAwakeEnabled: false,
	navbarHeight: 0,
	statusBarHeight: 0,
	safeAreaInsets: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	navigationMode: null,
	screenOrientation: null,
	screenOrientationType: null,
};

const state = createSliceState(initialState);

export const assets = createSlice({
	name: "device",
	...state,
});

export const {
	setKeepAwakeEnabled,
	setNavbarHeight,
	setNavigationMode,
	setScreenOrientation,
	setScreenOrientationType,
	setSafeAreaInsets,
} = assets.actions;

export const {
	selectKeepAwakeEnabled: selectKeepAwake,
	selectNavbarHeight,
	selectNavigationMode,
	selectScreenOrientation,
	selectScreenOrientationType,
	selectSafeAreaInsets,
} = assets.selectors;

export default assets.reducer;
