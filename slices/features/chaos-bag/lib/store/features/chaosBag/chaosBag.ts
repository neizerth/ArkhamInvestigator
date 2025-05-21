import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat, SkillCheckItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
	ChaosTokenType,
	ChaosTokensCount,
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
	currentTokenType: ChaosTokenType | null;
	enabled: boolean;
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
	currentTokenType: null,
	skillCheckExpression: [],
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
	setCurrentTokenType,
	setRevealedTokenIds,
	setRevealHistory,
	setRevealHistoryItem,
	setEnabled: setChaosBagEnabled,
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
	selectCurrentTokenType,
	selectRevealedTokenIds,
	selectRevealHistory,
	selectRevealHistoryItem,
} = chaosBag.selectors;

export default chaosBag.reducer;
