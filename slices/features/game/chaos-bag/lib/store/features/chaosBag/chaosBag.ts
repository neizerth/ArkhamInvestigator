import { createSlice } from "@reduxjs/toolkit";
import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
} from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
	ChaosTokensCount,
	ScenarioChaosTokenValues,
} from "../../../../model";

export type ChaosBagState = {
	tokenCount: ChaosTokensCount;
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
	boardChaosTokenValue: Record<string, ScenarioChaosTokenValues | null> | null;
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
	setRevealHistoryItem,
	setUnlimitedChaosTokens,
	setModifyChaosTokens,
	setChaosTokenValue,
	setBoardChaosTokenValue,
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
	selectRevealHistoryItem,
	selectUnlimitedChaosTokens,
	selectModifyChaosTokens,
	selectChaosTokenValue,
	selectBoardChaosTokenValue,
} = chaosBag.selectors;

export default chaosBag.reducer;
