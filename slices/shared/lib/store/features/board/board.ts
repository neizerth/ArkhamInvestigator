import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoard, PickerDecelerationType } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";

export type IBoardState = {
	currentInvestigatorIndex: number | null;
	investigatorBoards: InvestigatorBoard[];

	endTurnStrict: boolean;
	showDamageAndHorror: boolean;
	showDamageAndHorrorEffects: boolean;
	showFactionSelect: boolean;
	pickerDecelerationType: PickerDecelerationType;
	pickerIntervalMomentum: boolean;
	trackXP: boolean;
	saveTrauma: boolean;

	doom: number;
	clues: number;
};

const initialState: IBoardState = {
	currentInvestigatorIndex: null,
	endTurnStrict: true,
	investigatorBoards: [],
	showDamageAndHorror: false,
	showDamageAndHorrorEffects: false,
	showFactionSelect: false,
	pickerDecelerationType: false,
	pickerIntervalMomentum: false,
	trackXP: true,
	saveTrauma: true,
	doom: 0,
	clues: 0,
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
	setShowDamageAndHorrorEffects,
	setPickerDecelerationType,
	setPickerIntervalMomentum,
	setShowDamageAndHorror,
	setSaveTrauma,
	setTrackXP,
	setDoom,
	setClues,
} = board.actions;

export const {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	selectEndTurnStrict,
	selectShowFactionSelect,
	selectShowDamageAndHorrorEffects,
	selectPickerDecelerationType,
	selectPickerIntervalMomentum,
	selectShowDamageAndHorror,
	selectSaveTrauma,
	selectTrackXP,
	selectDoom,
	selectClues,
} = board.selectors;

export default board.reducer;
