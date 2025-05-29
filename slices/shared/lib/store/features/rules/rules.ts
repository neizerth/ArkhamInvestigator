import { createSlice } from "@reduxjs/toolkit";
import type { RulesItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IRulesState = {
	rules: RulesItem[];
};

const initialState: IRulesState = {
	rules: [],
};

export const rules = createSlice({
	name: "rules",
	...createSliceState(initialState),
});

export const { setRules } = rules.actions;

export const { selectRules } = rules.selectors;

export default rules.reducer;
