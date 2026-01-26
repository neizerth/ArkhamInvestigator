import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosOddsMap } from "../../model";

export type ChaosOddsState = {
	customSkillValue: number | null;
	boardOddsMatrix: ChaosOddsMap | null;
	boardOddsLoading: boolean;

	showChaosBagOdds: boolean;
	showSkillOdds: boolean;
	showPinnedCalculationOdds: boolean;
	minSkillOddsValue: number;
	completedChaosOddsPerformanceTests: Record<string, number> | null;
};

const initialState: ChaosOddsState = {
	customSkillValue: null,
	boardOddsMatrix: null,
	boardOddsLoading: false,
	showChaosBagOdds: false,
	showSkillOdds: false,
	showPinnedCalculationOdds: false,
	minSkillOddsValue: 0,
	completedChaosOddsPerformanceTests: null,
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
	setCompletedChaosOddsPerformanceTests,
	setShowPinnedCalculationOdds,
} = chaosOdds.actions;

export const {
	selectCustomSkillValue,
	selectBoardOddsMatrix,
	selectBoardOddsLoading,
	selectShowChaosBagOdds,
	selectShowSkillOdds,
	selectCompletedChaosOddsPerformanceTests,
	selectShowPinnedCalculationOdds,
} = chaosOdds.selectors;

export default chaosOdds.reducer;
