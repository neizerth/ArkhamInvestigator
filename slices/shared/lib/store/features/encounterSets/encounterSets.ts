import { createSlice } from "@reduxjs/toolkit";
import type { EncounterSet } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type EncounterSetsState = {
	encounterSets: EncounterSet[];
};

const initialState: EncounterSetsState = {
	encounterSets: [],
};

export const encounterSets = createSlice({
	name: "encounterSets",
	...createSliceState(initialState),
});
export const { setEncounterSets } = encounterSets.actions;
export const { selectEncounterSets } = encounterSets.selectors;

export default encounterSets.reducer;
