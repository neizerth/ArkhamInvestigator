import type { InvestigatorBoard } from "@modules/board/base/shared/model/board";
import * as boardHistoryReducers from "@modules/board/history/shared/lib/store/reducers";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import * as baseReducers from "./features/reducers";

export type BoardState = {
	currentInvestigatorIndex: number | null;
	investigatorBoards: InvestigatorBoard[];

	endTurnStrict: boolean;
	showDamageAndHorror: boolean;
	showDamageAndHorrorEffects: boolean;
	showAdditionalInformation: boolean;

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
	showAdditionalInformation: false,
	currentInvestigatorIndex: null,
	endTurnStrict: true,
	investigatorBoards: [],
	showDamageAndHorror: false,
	showDamageAndHorrorEffects: false,
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
	setShowAdditionalInformation,
	setCurrentInvestigatorIndex,
	setInvestigatorBoards,

	setEndTurnStrict,
	setShowDamageAndHorrorEffects,
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
	clearBoards,

	// board history reducers
	clearBoardHistory,
	clearCurrentBoardHistory,

	// description
	setShowDescription,
	setDescriptionTransition,

	unloadAllBoards,
	setBoardProgress,
} = board.actions;

export const {
	selectShowAdditionalInformation,
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,

	selectEndTurnStrict,
	selectShowDamageAndHorrorEffects,
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
