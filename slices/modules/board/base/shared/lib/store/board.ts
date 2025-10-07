import type { InvestigatorBoard } from "@modules/board/base/shared/model/board";
import * as boardHistoryReducers from "@modules/board/history/shared/lib/store/reducers";
import { createSlice } from "@reduxjs/toolkit";
import type { PickerDecelerationType } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import * as baseReducers from "./features/reducers";

export type BoardState = {
	currentInvestigatorIndex: number | null;
	investigatorBoards: InvestigatorBoard[];

	endTurnStrict: boolean;
	showDamageAndHorror: boolean;
	showDamageAndHorrorEffects: boolean;
	pickerDecelerationType: PickerDecelerationType;
	pickerIntervalMomentum: boolean;
	pickerAnimation: boolean;

	trackXP: boolean;
	saveTrauma: boolean;
	trackHandSize: boolean;
	showDoom: boolean;
	showClues: boolean;
	showResources: boolean;
	showScenarioClues: boolean;
	showScenarioResources: boolean;
	showInvestigatorDoom: boolean;
	tapToHidePins: boolean;
	alwaysShowGameText: boolean;
	showInitialHealthAndSanity: boolean;
	alwaysShowSkillModifiers: boolean;
	allowNegativeHealthAndSanity: boolean;
	showUpkeepResources: boolean;
	syncScenarioClues: boolean;

	showDescription: boolean;
	descriptionTransition: boolean;

	doom: number;
	clues: number;
	resources: number;
};

const initialState: BoardState = {
	currentInvestigatorIndex: null,
	endTurnStrict: true,
	investigatorBoards: [],
	showDamageAndHorror: false,
	showDamageAndHorrorEffects: false,
	pickerDecelerationType: false,
	pickerIntervalMomentum: false,
	pickerAnimation: true,
	trackXP: true,
	saveTrauma: true,
	trackHandSize: false,
	showDoom: true,
	showClues: true,
	showResources: true,
	showScenarioClues: true,
	showScenarioResources: false,
	showInvestigatorDoom: false,
	tapToHidePins: false,
	alwaysShowGameText: false,
	showInitialHealthAndSanity: false,
	alwaysShowSkillModifiers: false,
	allowNegativeHealthAndSanity: false,
	showUpkeepResources: false,
	syncScenarioClues: false,

	showDescription: false,
	descriptionTransition: false,

	doom: 0,
	clues: 0,
	resources: 0,
};

const state = createSliceState(initialState);

export const board = createSlice({
	name: "board",
	...state,
	reducers: {
		...state.reducers,
		...baseReducers,
		...boardHistoryReducers,
	},
});

export const {
	setCurrentInvestigatorIndex,
	setInvestigatorBoards,

	setEndTurnStrict,
	setShowDamageAndHorrorEffects,
	setPickerDecelerationType,
	setPickerIntervalMomentum,
	setPickerAnimation,
	setShowDamageAndHorror,
	setSaveTrauma,
	setTrackXP,
	setDoom,
	setClues,
	setResources,
	setTrackHandSize,
	setShowDoom,
	setShowClues,
	setShowResources,
	setShowScenarioClues,
	setShowScenarioResources,
	setShowInvestigatorDoom,
	setTapToHidePins,
	setAlwaysShowGameText,
	setShowInitialHealthAndSanity,
	setAlwaysShowSkillModifiers,
	setAllowNegativeHealthAndSanity,
	setShowUpkeepResources,
	setSyncScenarioClues,

	// internal reducers
	setBoardInternal,
	setBoardPartInternal,
	setBoardPropInternal,
	setBoardPropValueInternal,
	setBoardValuePartInternal,

	// reducers
	addInvestigatorBoard,

	// board history reducers
	clearBoardHistory,
	clearCurrentBoardHistory,

	// description
	setShowDescription,
	setDescriptionTransition,

	setNextBoardIndex,
	setPrevBoardIndex,

	unloadAllBoards,
	setBoardProgress,
} = board.actions;

export const {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,

	selectEndTurnStrict,
	selectShowDamageAndHorrorEffects,
	selectPickerDecelerationType,
	selectPickerAnimation,
	selectPickerIntervalMomentum,
	selectShowDamageAndHorror,
	selectSaveTrauma,
	selectTrackXP,
	selectDoom,
	selectClues,
	selectShowClues,
	selectResources,
	selectTrackHandSize,
	selectShowDoom,
	selectShowResources,
	selectShowScenarioClues,
	selectShowScenarioResources,
	selectShowInvestigatorDoom,
	selectTapToHidePins,
	selectAlwaysShowGameText,
	selectShowInitialHealthAndSanity,
	selectAlwaysShowSkillModifiers,
	selectAllowNegativeHealthAndSanity,
	selectShowUpkeepResources,
	selectSyncScenarioClues,

	selectShowDescription,
	selectDescriptionTransition,
} = board.selectors;

export default board.reducer;
