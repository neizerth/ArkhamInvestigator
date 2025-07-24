import { createSlice } from "@reduxjs/toolkit";
import type {
	InvestigatorSignature,
	InvestigatorSignatureGroup,
} from "arkham-investigator-data";

import type { InvestigatorSettings } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import { loadLocaleData } from "../app/actions/api";

export type IInvestigatorsState = {
	mediaVersion: string | null;
	mediaUpdateTime: string | null;
	signatureGroups: InvestigatorSignatureGroup[];
	tabooSignatures: InvestigatorSignature[];
	investigatorSettings: Record<string, InvestigatorSettings> | null;
};

const initialState: IInvestigatorsState = {
	mediaVersion: null,
	mediaUpdateTime: null,
	signatureGroups: [],
	tabooSignatures: [],
	investigatorSettings: null,
};

export const investigators = createSlice({
	name: "investigators",
	...createSliceState(initialState),
	extraReducers: (builder) => {
		builder.addCase(loadLocaleData.fulfilled, (state, { payload }) => {
			state.signatureGroups = payload.groups;
			state.tabooSignatures = payload.taboo;
		});
	},
});

export const {
	setMediaVersion,
	setSignatureGroups,
	setTabooSignatures,
	setInvestigatorSettings,
	setMediaUpdateTime,
} = investigators.actions;

export const {
	selectMediaVersion,
	selectSignatureGroups,
	selectTabooSignatures,
	selectInvestigatorSettings,
	selectMediaUpdateTime,
} = investigators.selectors;

export default investigators.reducer;
