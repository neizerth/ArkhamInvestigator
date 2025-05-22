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
	trackHandSize: boolean;
	showDoom: boolean;
	showScenarioClues: boolean;
	showScenarioResources: boolean;
	showInvestigatorDoom: boolean;
	tapToHidePins: boolean;
	alwaysShowGameText: boolean;
	gameTextHeight: number;
	showInitialHealthAndSanity: boolean;
	alwaysShowSkillModifiers: boolean;
	allowNegativeHealthAndSanity: boolean;

	doom: number;
	clues: number;
	resources: number;
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
	trackHandSize: false,
	showDoom: true,
	showScenarioClues: true,
	showScenarioResources: false,
	showInvestigatorDoom: false,
	tapToHidePins: false,
	alwaysShowGameText: false,
	showInitialHealthAndSanity: false,
	alwaysShowSkillModifiers: false,
	allowNegativeHealthAndSanity: false,
	doom: 0,
	clues: 0,
	resources: 0,
	gameTextHeight: 0,
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
	setResources,
	setTrackHandSize,
	setShowDoom,
	setShowScenarioClues,
	setShowScenarioResources,
	setShowInvestigatorDoom,
	setTapToHidePins,
	setAlwaysShowGameText,
	setGameTextHeight,
	setShowInitialHealthAndSanity,
	setAlwaysShowSkillModifiers,
	setAllowNegativeHealthAndSanity,
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
	selectResources,
	selectTrackHandSize,
	selectShowDoom,
	selectShowScenarioClues,
	selectShowScenarioResources,
	selectShowInvestigatorDoom,
	selectTapToHidePins,
	selectAlwaysShowGameText,
	selectGameTextHeight,
	selectShowInitialHealthAndSanity,
	selectAlwaysShowSkillModifiers,
	selectAllowNegativeHealthAndSanity,
} = board.selectors;

export default board.reducer;
