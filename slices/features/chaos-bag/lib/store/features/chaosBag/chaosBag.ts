import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat, SkillCheckItem } from "@shared/model";
import type { ReferenceCard } from "arkham-investigator-data";
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
	skillCheckTitle: string | null;
	skillValue: number | null;
	skillCheckExpression: SkillCheckItem[];

	loadingAnimation: boolean;
	revealHistory: ChaosBagHistoryItem[];
	revealHistoryItem: ChaosBagHistoryItem | null;
	referenceCard: ReferenceCard | null;
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
	skillCheckExpression: [],
	referenceCard: null,
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
	setRevealedTokenIds,
	setRevealHistory,
	setRevealHistoryItem,
	setEnabled: setChaosBagEnabled,
	setReferenceCard,
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
	selectRevealedTokenIds,
	selectRevealHistory,
	selectRevealHistoryItem,
	selectReferenceCard,
} = chaosBag.selectors;

export default chaosBag.reducer;
