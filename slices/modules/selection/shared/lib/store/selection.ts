import type {
	FactionFilterType,
	SelectedSignature,
} from "@modules/selection/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type SelectionState = {
	factionFilter: FactionFilterType | null;
	selectedSignatures: SelectedSignature[] | null;
	replaceSignature: boolean;
};

const initialState: SelectionState = {
	factionFilter: null,
	selectedSignatures: null,
	replaceSignature: false,
};

const state = createSliceState(initialState);

export const selection = createSlice({
	name: "selection",
	...state,
});

export const { setSelectedSignatures, setFactionFilter, setReplaceSignature } =
	selection.actions;

export const {
	selectSelectedSignatures,
	selectFactionFilter,
	selectReplaceSignature,
} = selection.selectors;

export default selection.reducer;
