import { createSlice } from "@reduxjs/toolkit";
import type { ArkhamIcon } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IIconsState = {
	icons: ArkhamIcon[];
};

const initialState: IIconsState = {
	icons: [],
};

export const icons = createSlice({
	name: "icons",
	...createSliceState(initialState),
});

export const { setIcons } = icons.actions;
export const { selectIcons } = icons.selectors;

export default icons.reducer;
