import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorSource } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IInvestigatorSourcesState = {
	investigatorSources: InvestigatorSource[];
};

const initialState: IInvestigatorSourcesState = {
	investigatorSources: [],
};

export const investigatorSources = createSlice({
	name: "investigatorSources",
	...createSliceState(initialState),
});

export const { setInvestigatorSources } = investigatorSources.actions;
export const { selectInvestigatorSources } = investigatorSources.selectors;

export default investigatorSources.reducer;
