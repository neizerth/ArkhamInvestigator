import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosOddsMap } from "../../model";

export type ChaosOddsState = {
	customSkillValue: number | null;
	boardOddsMatrix: ChaosOddsMap | null;
	boardOddsLoading: boolean;
};

const initialState: ChaosOddsState = {
	customSkillValue: null,
	boardOddsMatrix: null,
	boardOddsLoading: false,
};

const state = createSliceState(initialState);

export const chaosOdds = createSlice({
	name: "chaosOdds",
	...state,
});

export const { setCustomSkillValue, setBoardOddsMatrix, setBoardOddsLoading } =
	chaosOdds.actions;

export const {
	selectCustomSkillValue,
	selectBoardOddsMatrix,
	selectBoardOddsLoading,
} = chaosOdds.selectors;

export default chaosOdds.reducer;
