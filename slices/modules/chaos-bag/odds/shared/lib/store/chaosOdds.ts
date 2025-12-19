import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosOddsMap } from "../../model";

export type ChaosOddsState = {
	customSkillValue: number | null;
	boardOddsMatrix: ChaosOddsMap | null;
	boardOddsLoading: boolean;

	showChaosBagOdds: boolean;
	showSkillOdds: boolean;
	minSkillOddsValue: number;
};

const initialState: ChaosOddsState = {
	customSkillValue: null,
	boardOddsMatrix: null,
	boardOddsLoading: false,
	showChaosBagOdds: false,
	showSkillOdds: false,
	minSkillOddsValue: 0,
};

const state = createSliceState(initialState);

export const chaosOdds = createSlice({
	name: "chaosOdds",
	...state,
});

export const {
	setCustomSkillValue,
	setBoardOddsMatrix,
	setBoardOddsLoading,
	setShowChaosBagOdds,
	setShowSkillOdds,
} = chaosOdds.actions;

export const {
	selectCustomSkillValue,
	selectBoardOddsMatrix,
	selectBoardOddsLoading,
	selectShowChaosBagOdds,
	selectShowSkillOdds,
} = chaosOdds.selectors;

export default chaosOdds.reducer;
