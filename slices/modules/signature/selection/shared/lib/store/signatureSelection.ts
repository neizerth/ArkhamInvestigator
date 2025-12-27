import type {
	FactionFilterType,
	SelectedSignature,
} from "@modules/signature/selection/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./features/reducers";

export type SignatureSelectionState = {
	factionFilter: FactionFilterType | null;
	selectedSignatures: SelectedSignature[] | null;
	replaceSignature: boolean;
	currentSignatureGroup: InvestigatorSignatureGroup | null;
	currentSkinId: string | null;
	currentSignatureId: string | null;
};

const initialState: SignatureSelectionState = {
	factionFilter: null,
	selectedSignatures: null,
	replaceSignature: false,

	currentSignatureGroup: null,
	currentSignatureId: null,
	currentSkinId: null,
};

const state = createSliceState(initialState);

export const signatureSelection = createSlice({
	name: "signatureSelection",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setSelectedSignatures,
	setFactionFilter,
	setReplaceSignature,
	setSignatureSkin,
	setSignatureVariant,
	setCurrentSignature,
	resetCurrentSignature,

	setCurrentSignatureGroup,
	setCurrentSignatureId,
	setCurrentSkinId,

	addSelectedSignature,
	removeSelectedSignatureByCode,
	clearSelectedSignatures,
} = signatureSelection.actions;

export const {
	selectSelectedSignatures,
	selectFactionFilter,
	selectReplaceSignature,

	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
	selectCurrentSkinId,
} = signatureSelection.selectors;

export default signatureSelection.reducer;
