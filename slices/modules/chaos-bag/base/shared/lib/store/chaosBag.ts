import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import { chaosBagTokenRevealReducers } from "@modules/chaos-bag/reveal/base/shared/lib";
import { chaosBagRevealHistoryReducers } from "@modules/chaos-bag/reveal/history/shared/lib";
import { chaosBagRevealModalSharedReducers } from "@modules/chaos-bag/reveal/modal/shared/lib";
import { chaosBagValueSharedReducers } from "@modules/chaos-bag/value/shared/lib";
import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import * as baseReducers from "./reducers";

import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
	ChaosTokenCount,
	ScenarioChaosTokenValues,
} from "../../model";

export type ChaosBagState = {
	tokenCount: ChaosTokenCount;
	contents: ChaosBagToken[];
	showRevealModal: boolean;
	revealedTokenIds: string[];

	skillCheckType: InvestigatorBoardNumericStat | null;
	skillCheckTitle: string | null;
	skillValue: number | null;
	skillCheckExpression: SkillCheckItem[];

	loadingAnimation: boolean;
	revealHistory: ChaosBagHistoryItem[];
	revealHistoryItem: ChaosBagHistoryItem | null;
	currentTokenId: string | null;
	enabled: boolean;
	unlimitedChaosTokens: boolean;
	modifyChaosTokens: boolean;
	chaosTokenValue: ScenarioChaosTokenValues | null;
	boardChaosTokenValue: Record<number, ScenarioChaosTokenValues | null> | null;
};

const initialState: ChaosBagState = {
	enabled: true,
	tokenCount: {},
	contents: [],
	showRevealModal: false,
	revealedTokenIds: [],
	skillCheckType: null,
	skillCheckTitle: null,
	skillValue: null,
	loadingAnimation: true,
	revealHistory: [],
	revealHistoryItem: null,
	currentTokenId: null,
	skillCheckExpression: [],
	unlimitedChaosTokens: false,
	modifyChaosTokens: false,
	chaosTokenValue: null,
	boardChaosTokenValue: null,
};

const state = createSliceState(initialState);

export const chaosBag = createSlice({
	name: "chaosBag",
	...state,
	reducers: {
		...state.reducers,
		...baseReducers,
		...chaosBagTokenRevealReducers,
		...chaosBagRevealHistoryReducers,
		...chaosBagValueSharedReducers,
		...chaosBagRevealModalSharedReducers,
	},
});

export const {
	setTokenCount: setChaosBagTokenCount,
	setContents: setChaosBagContents,
	setShowRevealModal: setShowRevealChaosTokenModal,
	setSkillCheckType: setChaosBagSkillCheckType,
	setSkillValue: setChaosBagSkillValue,
	setLoadingAnimation: setChaosBagLoadingAnimation,
	setSkillCheckTitle: setChaosBagSkillCheckTitle,
	setSkillCheckExpression: setChaosBagSkillCheckExpression,
	setEnabled: setChaosBagEnabled,
	setCurrentTokenId,
	setRevealedTokenIds,
	setRevealHistory,
	setRevealHistoryItem: setCurrentRevealHistoryItem,
	setUnlimitedChaosTokens,
	setModifyChaosTokens,
	setChaosTokenValue: setChaosTokenValueInternal,
	setBoardChaosTokenValue,

	// reducers
	clearRevealHistory,
	addRevealHistoryItem,
	removeRevealHistoryItem,
	patchRevealHistoryItem,

	// internal reducers
	addChaosTokenInternal,
	removeAllChaosTokensByType,
	removeChaosTokenById,
	updateChaosTokenInternal,

	updateChaosTokenValueInternal,
	updateBoardChaosTokenValueInternal,

	removeRevealedTokenId,
	addRevealedTokens,

	cancelShowRevealChaosBagModal,
	closeRevealChaosBagModal,
	openSkillCheckChaosBagModal,
	showRevealChaosBagModal,

	clearChaosTokenValue,
} = chaosBag.actions;

export const {
	selectTokenCount: selectChaosBagTokenCount,
	selectContents: selectChaosBagContents,
	selectShowRevealModal: selectShowRevealChaosTokenModal,
	selectSkillCheckType: selectChaosBagSkillCheckType,
	selectSkillValue: selectChaosBagSkillValue,
	selectLoadingAnimation: selectChaosBagLoadingAnimation,
	selectSkillCheckTitle: selectChaosBagSkillCheckTitle,
	selectSkillCheckExpression: selectChaosBagSkillCheckExpression,
	selectEnabled: selectChaosBagEnabled,
	selectCurrentTokenId,
	selectRevealedTokenIds,
	selectRevealHistory,
	selectRevealHistoryItem: selectCurrentRevealHistoryItem,
	selectUnlimitedChaosTokens,
	selectModifyChaosTokens,
	selectChaosTokenValue: selectChaosTokenValueInternal,
	selectBoardChaosTokenValue,
} = chaosBag.selectors;

export default chaosBag.reducer;
