import { createSlice } from "@reduxjs/toolkit";
import type { RulesItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IRulesState = {
	rules?: RulesItem[];
	openTimingPhases?: number[];
};

const initialState: IRulesState = {
	rules: [],
	openTimingPhases: [],
};

export const rules = createSlice({
	name: "rules",
	...createSliceState(initialState),
});

export const { setRules, setOpenTimingPhases } = rules.actions;

export const { selectRules, selectOpenTimingPhases } = rules.selectors;

export default rules.reducer;
