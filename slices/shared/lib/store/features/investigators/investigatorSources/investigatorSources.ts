import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorSource } from "@shared/model";
import { prop } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import { loadCoreData } from "../../app/actions/api";

export type IInvestigatorSourcesState = {
	investigatorSources: InvestigatorSource[];
};

const initialState: IInvestigatorSourcesState = {
	investigatorSources: [],
};

export const investigatorSources = createSlice({
	name: "investigatorSources",
	...createSliceState(initialState),
	extraReducers(builder) {
		builder.addCase(loadCoreData.fulfilled, (state, { payload }) => {
			const { stories } = payload;

			state.investigatorSources = stories.flatMap(prop("investigators"));
		});
	},
});

export const { selectInvestigatorSources } = investigatorSources.selectors;

export default investigatorSources.reducer;
