import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type ChaosOddsState = {
	customSkillValue: number | null;
};

const initialState: ChaosOddsState = {
	customSkillValue: null,
};

const state = createSliceState(initialState);

export const chaosOdds = createSlice({
	name: "chaosOdds",
	...state,
});

export const { setCustomSkillValue } = chaosOdds.actions;

export const { selectCustomSkillValue } = chaosOdds.selectors;

export default chaosOdds.reducer;
