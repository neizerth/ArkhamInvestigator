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

	replaceInvestigator: boolean;
};

const initialState: GameState = {
	factionFilter: null,
	selectedInvestigators: [],
	currentSignatureGroup: null,
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
	setReplaceInvestigator,
	setFactionFilter,
	setCurrentSignatureId,
	setCurrentSkinId,
	setSignatureSelection,
} = game.actions;

export const {
	selectSelectedInvestigators,
	selectCurrentSignatureGroup,
	selectReplaceInvestigator,
	selectFactionFilter,
	selectCurrentSignatureId,
	selectCurrentSkinId,
} = game.selectors;

export default game.reducer;
