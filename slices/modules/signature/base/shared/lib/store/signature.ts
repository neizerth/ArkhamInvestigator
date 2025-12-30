import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";

import { createSliceState } from "redux-toolkit-helpers";
import type { InvestigatorSettings } from "../../model";
import * as reducers from "./features/reducers";

export type SignatureState = {
	mediaVersion: string | null;
	mediaUpdateTime: string | null;
	signatureGroups: InvestigatorSignatureGroup[];
	signatureSettings: Record<string, InvestigatorSettings> | null;
};

const initialState: SignatureState = {
	mediaVersion: null,
	mediaUpdateTime: null,
	signatureGroups: [],
	signatureSettings: null,
};

const state = createSliceState(initialState);

export const signatures = createSlice({
	name: "signature",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setMediaVersion,
	setSignatureGroups,
	setSignatureSettings,
	setMediaUpdateTime,

	clearTraumaSettings,
	setInvestigatorCounterEnabled,
	setInvestigatorSettingsByCode,
	setInvestigatorSettingsProp,
	toggleInvestigatorCounter,
} = signatures.actions;

export const {
	selectMediaVersion,
	selectSignatureGroups,
	selectSignatureSettings,
	selectMediaUpdateTime,
} = signatures.selectors;

export default signatures.reducer;
