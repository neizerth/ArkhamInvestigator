import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type { SkillCheckDifficultyType, SkillCheckItem } from "../../model";
import * as reducers from "./reducers";

export type SkillCheckState = {
	type: InvestigatorBoardNumericStat | null;
	data: SkillCheckItem[];
	historyShown: boolean;
	showCalculationDiff: boolean;
	skillCheckDifficulty: number | null;
	skillCheckDifficultyType: SkillCheckDifficultyType | null;
};

const initialState: SkillCheckState = {
	type: null,
	data: [],
	historyShown: false,
	showCalculationDiff: false,
	skillCheckDifficulty: null,
	skillCheckDifficultyType: null,
};

const state = createSliceState(initialState);

export const skillCheck = createSlice({
	name: "skillCheck",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setData: setSkillCheckData,
	setType: setSkillCheckType,
	sendCommandSignal,
	sendNumberSignal,
	sendOperatorSignal,
	sendStatSignal,
	sendResultSignal,
	setHistoryShown,
	setShowCalculationDiff,
	setSkillCheckDifficulty,
	setSkillCheckDifficultyType,
} = skillCheck.actions;

export const {
	selectData: selectSkillCheckData,
	selectType: selectSkillCheckType,
	selectHistoryShown,
	selectShowCalculationDiff,
	selectSkillCheckDifficulty,
	selectSkillCheckDifficultyType,
} = skillCheck.selectors;

export const skillCheckReducer = skillCheck.reducer;
