import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type I18NState = {
	enableNavigationAnimation: boolean;
};

const initialState: I18NState = {
	enableNavigationAnimation: true,
};

export const router = createSlice({
	name: "router",
	...createSliceState(initialState),
});

export const { setEnableNavigationAnimation } = router.actions;

export const { selectEnableNavigationAnimation } = router.selectors;

export default router.reducer;
