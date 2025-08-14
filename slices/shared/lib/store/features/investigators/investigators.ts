import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";

import type { InvestigatorSettings } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IInvestigatorsState = {
	mediaVersion: string | null;
	mediaUpdateTime: string | null;
	signatureGroups: InvestigatorSignatureGroup[];
	investigatorSettings: Record<string, InvestigatorSettings> | null;
};

const initialState: IInvestigatorsState = {
	mediaVersion: null,
	mediaUpdateTime: null,
	signatureGroups: [],
	investigatorSettings: null,
};

export const investigators = createSlice({
	name: "investigators",
	...createSliceState(initialState),
});

export const {
	setMediaVersion,
	setSignatureGroups,
	setInvestigatorSettings,
	setMediaUpdateTime,
} = investigators.actions;

export const {
	selectMediaVersion,
	selectSignatureGroups,
	selectInvestigatorSettings,
	selectMediaUpdateTime,
} = investigators.selectors;

export default investigators.reducer;
