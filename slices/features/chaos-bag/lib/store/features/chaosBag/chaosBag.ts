import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type {
	ChaosBagHistoryItem,
	ChaosBagToken,
	ChaosTokensCount,
} from "../../../../model";

export type IChaosBagState = {
	tokenCount: ChaosTokensCount;
	contents: ChaosBagToken[];
	showRevealModal: boolean;
	revealedTokenIds: string[];
	skillCheckType: InvestigatorBoardStat | null;
	skillValue: number | null;
	loadingAnimation: boolean;
	revealHistory: ChaosBagHistoryItem[];
	revealHistoryItem: ChaosBagHistoryItem | null;
};

const initialState: IChaosBagState = {
	tokenCount: {},
	contents: [],
	showRevealModal: false,
	revealedTokenIds: [],
	skillCheckType: null,
	skillValue: null,
	loadingAnimation: true,
	revealHistory: [],
	revealHistoryItem: null,
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
	setRevealedTokenIds,
	setRevealHistory,
	setRevealHistoryItem,
} = chaosBag.actions;

export const {
	selectTokenCount: selectChaosBagTokenCount,
	selectContents: selectChaosBagContents,
	selectShowRevealModal: selectShowRevealChaosTokenModal,
	selectSkillCheckType: selectChaosBagSkillCheckType,
	selectSkillValue: selectChaosBagSkillValue,
	selectLoadingAnimation: selectChaosBagLoadingAnimation,
	selectRevealedTokenIds,
	selectRevealHistory,
	selectRevealHistoryItem,
} = chaosBag.selectors;

export default chaosBag.reducer;
