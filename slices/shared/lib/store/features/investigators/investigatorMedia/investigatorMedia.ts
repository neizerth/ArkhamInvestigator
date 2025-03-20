import { createSlice } from "@reduxjs/toolkit";
import type { Investigator } from "arkham-investigator-data";

import { createSliceReducer, createSliceState } from "redux-toolkit-helpers";
import { loadInvestigatorsMediaData } from "../../app/actions/api";
export type IInvestigatorsState = {
	mediaVersion: string | null;
	investigatorMedia: Investigator[];
};

const initialState: IInvestigatorsState = {
	mediaVersion: null,
	investigatorMedia: [],
};

export const investigatorMedia = createSlice({
	name: "investigatorMedia",
	...createSliceState(initialState),
	extraReducers: (builder) => {
		builder.addCase(
			loadInvestigatorsMediaData.fulfilled,
			(state, { payload }) => {
				state.investigatorMedia = payload.data;
				state.mediaVersion = payload.version;
			},
		);
	},
});

export const { selectInvestigatorMedia, selectMediaVersion } =
	investigatorMedia.selectors;

export default investigatorMedia.reducer;
