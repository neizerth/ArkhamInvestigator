import { createSlice } from "@reduxjs/toolkit";
import type {
	FactionFilterType,
	Nullable,
	SelectedInvestigator,
} from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./reducers";

export type GameState = {
	factionFilter: FactionFilterType | null;
	selectedInvestigators: SelectedInvestigator[];
	currentSignatureGroup: Nullable<InvestigatorSignatureGroup>;
	currentSkinId: string | null;
	currentSignatureId: string | null;

	showDescription: boolean;
	showAdditionalInformation: boolean;
	replaceInvestigator: boolean;
};

const initialState: GameState = {
	factionFilter: null,
	selectedInvestigators: [],
	currentSignatureGroup: null,
	showDescription: false,
	showAdditionalInformation: false,
	replaceInvestigator: false,
	currentSignatureId: null,
	currentSkinId: null,
};

const state = createSliceState(initialState);

export const game = createSlice({
	name: "game",
	...state,
	reducers: {
		...reducers,
		...state.reducers,
	},
});

export const {
	setSelectedInvestigators,
	setCurrentSignatureGroup,
	setInvestigatorSkin,
	setInvestigatorSignature,
	setShowDescription,
	setReplaceInvestigator,
	setShowAdditionalInformation,
	setFactionFilter,
	setCurrentSignatureId,
	setCurrentSkinId,
} = game.actions;

export const {
	selectSelectedInvestigators,
	selectCurrentSignatureGroup,
	selectShowDescription,
	selectReplaceInvestigator,
	selectShowAdditionalInformation,
	selectFactionFilter,
	selectCurrentSignatureId,
	selectCurrentSkinId,
} = game.selectors;

export default game.reducer;
