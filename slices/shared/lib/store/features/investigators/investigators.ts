import { createSlice } from "@reduxjs/toolkit";
import type {
	InvestigatorSignature,
	InvestigatorSignatureGroup,
} from "arkham-investigator-data";

import { createSliceState } from "redux-toolkit-helpers";
import { loadInvestigatorSignatures } from "../app/actions/api";

export type IInvestigatorsState = {
	mediaVersion: string | null;
	signatureGroups: InvestigatorSignatureGroup[];
	tabooSignatures: InvestigatorSignature[];
};

const initialState: IInvestigatorsState = {
	mediaVersion: null,
	signatureGroups: [],
	tabooSignatures: [],
};

export const investigators = createSlice({
	name: "investigators",
	...createSliceState(initialState),
	extraReducers: (builder) => {
		builder.addCase(
			loadInvestigatorSignatures.fulfilled,
			(state, { payload }) => {
				state.signatureGroups = payload.groups;
				state.tabooSignatures = payload.taboo;
			},
		);
	},
});

export const { setMediaVersion, setSignatureGroups, setTabooSignatures } =
	investigators.actions;

export const {
	selectMediaVersion,
	selectSignatureGroups,
	selectTabooSignatures,
} = investigators.selectors;

export default investigators.reducer;
