import type {
	FactionFilterType,
	SelectedSignature,
} from "@modules/selection/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./features/reducers";

export type SelectionState = {
	factionFilter: FactionFilterType | null;
	selectedSignatures: SelectedSignature[] | null;
	replaceSignature: boolean;
	currentSignatureGroup: InvestigatorSignatureGroup | null;
	currentSkinId: string | null;
	currentSignatureId: string | null;
};

const initialState: SelectionState = {
	factionFilter: null,
	selectedSignatures: null,
	replaceSignature: false,

	currentSignatureGroup: null,
	currentSignatureId: null,
	currentSkinId: null,
};

const state = createSliceState(initialState);

export const selection = createSlice({
	name: "selection",
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
} = selection.actions;

export const {
	selectSelectedSignatures,
	selectFactionFilter,
	selectReplaceSignature,
} = selection.selectors;

export default selection.reducer;
