import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { PickerDecelerationType, PickerSize } from "../../model";

export type PickerState = {
	pickerDecelerationType: PickerDecelerationType;
	pickerIntervalMomentum: boolean;
	pickerAnimation: boolean;
	pickerSize: PickerSize;
};

const initialState: PickerState = {
	pickerDecelerationType: false,
	pickerIntervalMomentum: false,
	pickerAnimation: true,
	pickerSize: "large",
};

const state = createSliceState(initialState);

export const picker = createSlice({
	name: "picker",
	...state,
});

export const {
	setPickerDecelerationType,
	setPickerIntervalMomentum,
	setPickerAnimation,
	setPickerSize,
} = picker.actions;

export const {
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
	selectPickerAnimation,
	selectPickerSize,
} = picker.selectors;

export default picker.reducer;
