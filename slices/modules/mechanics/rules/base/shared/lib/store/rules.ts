import { createSlice } from "@reduxjs/toolkit";
import type { RulesItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type RulesState = {
	rules?: RulesItem[];
};

const initialState: RulesState = {
	rules: [],
};

const state = createSliceState(initialState);

export const rules = createSlice({
	name: "rules",
	...state,
});

export const { setRules } = rules.actions;

export const { selectRules } = rules.selectors;

export default rules.reducer;
