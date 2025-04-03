import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoard } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IBoardState = {
	currentInvestigatorIndex: number | null;
	investigatorBoards: InvestigatorBoard[];
	endTurnStrict: boolean;
	showDamageAndHorror: boolean;
	showFactionSelect: boolean;
};

const initialState: IBoardState = {
	currentInvestigatorIndex: null,
	endTurnStrict: true,
	investigatorBoards: [],
	showDamageAndHorror: false,
	showFactionSelect: false,
};

const state = createSliceState(initialState);

export const board = createSlice({
	name: "board",
	...state,
});

export const {
	setCurrentInvestigatorIndex,
	setInvestigatorBoards,
	setEndTurnStrict,
	setShowFactionSelect,
} = board.actions;

export const {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	selectEndTurnStrict,
	selectShowFactionSelect,
} = board.selectors;

export default board.reducer;
