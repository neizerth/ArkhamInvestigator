import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat, SkillCheckItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
	ChaosTokensCount,
	ScenarioChaosTokenValues,
} from "../../../../model";

export type IChaosBagState = {
	tokenCount: ChaosTokensCount;
	contents: ChaosBagToken[];
	showRevealModal: boolean;
	revealedTokenIds: string[];

	skillCheckType: InvestigatorBoardStat | null;
	skillCheckTitle: string | null;
	skillValue: number | null;
	skillCheckExpression: SkillCheckItem[];

	loadingAnimation: boolean;
	revealHistory: ChaosBagHistoryItem[];
	revealHistoryItem: ChaosBagHistoryItem | null;
	currentTokenId: string | null;
	enabled: boolean;
	unlimitedChaosTokens: boolean;
	modifyScenarioChaosTokens: boolean;
	chaosTokenValue: ScenarioChaosTokenValues | null;
	investigatorChaosTokenValue: Record<
		string,
		ScenarioChaosTokenValues | null
	> | null;
};

const initialState: IChaosBagState = {
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
	modifyScenarioChaosTokens: false,
	chaosTokenValue: null,
	investigatorChaosTokenValue: null,
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
	setModifyScenarioChaosTokens,
	setChaosTokenValue,
	setInvestigatorChaosTokenValue,
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
	selectModifyScenarioChaosTokens,
	selectChaosTokenValue,
	selectInvestigatorChaosTokenValue,
} = chaosBag.selectors;

export default chaosBag.reducer;
