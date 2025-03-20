import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat, SkillCheckItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./reducers";

export type ISkillCheckState = {
	type: InvestigatorBoardStat | null;
	data: SkillCheckItem[];
	historyShown: boolean;
};

const initialState: ISkillCheckState = {
	type: null,
	data: [],
	historyShown: false,
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
} = skillCheck.actions;

export const {
	selectData: selectSkillCheckData,
	selectType: selectSkillCheckType,
	selectHistoryShown,
} = skillCheck.selectors;

export default skillCheck.reducer;
