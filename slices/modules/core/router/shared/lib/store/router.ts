import { createSlice } from "@reduxjs/toolkit";
import type { Href } from "expo-router";
import { createSliceState } from "redux-toolkit-helpers";

export type I18NState = {
	enableNavigationAnimation: boolean;
	currentRoute: Href;
};

const initialState: I18NState = {
	enableNavigationAnimation: true,
	currentRoute: "/",
};

export const router = createSlice({
	name: "router",
	...createSliceState(initialState),
});

export const { setEnableNavigationAnimation, setCurrentRoute } = router.actions;

export const { selectEnableNavigationAnimation, selectCurrentRoute } =
	router.selectors;

export default router.reducer;
