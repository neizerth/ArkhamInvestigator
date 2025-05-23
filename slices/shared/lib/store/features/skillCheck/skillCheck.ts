import { createSlice } from "@reduxjs/toolkit";
import type {
	InvestigatorBoardStat,
	SkillCheckDifficultyType,
	SkillCheckItem,
} from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./reducers";

export type ISkillCheckState = {
	type: InvestigatorBoardStat | null;
	data: SkillCheckItem[];
	historyShown: boolean;
	showCalculationDiff: boolean;
	skillCheckDifficulty: number | null;
	skillCheckDifficultyType: SkillCheckDifficultyType | null;
};

const initialState: ISkillCheckState = {
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

export default skillCheck.reducer;
