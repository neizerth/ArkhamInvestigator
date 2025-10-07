import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { BoardPickerSize, PickerDecelerationType } from "../../model";

export type PickerState = {
	pickerDecelerationType: PickerDecelerationType;
	pickerIntervalMomentum: boolean;
	pickerAnimation: boolean;
	boardPickerSize: BoardPickerSize;
};

const initialState: PickerState = {
	pickerDecelerationType: false,
	pickerIntervalMomentum: false,
	pickerAnimation: true,
	boardPickerSize: "large",
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
	setBoardPickerSize,
} = picker.actions;

export const {
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
	selectPickerAnimation,
	selectBoardPickerSize,
} = picker.selectors;

export default picker.reducer;
