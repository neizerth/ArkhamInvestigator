import { createSlice } from "@reduxjs/toolkit";
import type {
	Investigator,
	InvestigatorSignature,
} from "arkham-investigator-data";

import { createSliceState } from "redux-toolkit-helpers";
import {
	loadInvestigatorSignatures,
	loadInvestigatorsMediaData,
} from "../app/actions/api";

export type IInvestigatorsState = {
	mediaVersion: string | null;
	investigatorMedia: Investigator[];
	signatures: InvestigatorSignature[];
	tabooSignatures: InvestigatorSignature[];
};

const initialState: IInvestigatorsState = {
	mediaVersion: null,
	investigatorMedia: [],
	signatures: [],
	tabooSignatures: [],
};

export const investigators = createSlice({
	name: "investigators",
	...createSliceState(initialState),
	extraReducers: (builder) => {
		builder
			.addCase(loadInvestigatorsMediaData.fulfilled, (state, { payload }) => {
				state.investigatorMedia = payload.data;
				state.mediaVersion = payload.version;
			})
			.addCase(loadInvestigatorSignatures.fulfilled, (state, { payload }) => {
				state.signatures = payload.cards;
				state.tabooSignatures = payload.taboo;
			});
	},
});

export const {
	selectInvestigatorMedia,
	selectMediaVersion,
	selectSignatures,
	selectTabooSignatures,
} = investigators.selectors;

export default investigators.reducer;
