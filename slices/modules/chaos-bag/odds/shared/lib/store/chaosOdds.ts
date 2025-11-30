import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosOddsMap } from "../../model";

export type ChaosOddsState = {
	customSkillValue: number | null;
	boardOddsResults: ChaosOddsMap | null;
	boardOddsLoading: boolean;
	oddsCacheKey: string | null;
};

const initialState: ChaosOddsState = {
	customSkillValue: null,
	boardOddsResults: null,
	boardOddsLoading: false,
	oddsCacheKey: null,
};

const state = createSliceState(initialState);

export const chaosOdds = createSlice({
	name: "chaosOdds",
	...state,
});

export const {
	setCustomSkillValue,
	setBoardOddsResults,
	setBoardOddsLoading,
	setOddsCacheKey,
} = chaosOdds.actions;

export const {
	selectCustomSkillValue,
	selectBoardOddsResults,
	selectBoardOddsLoading,
	selectOddsCacheKey,
} = chaosOdds.selectors;

export default chaosOdds.reducer;
