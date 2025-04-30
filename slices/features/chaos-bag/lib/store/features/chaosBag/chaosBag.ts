import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type { ChaosBagToken, ChaosTokensCount } from "../../../../model";

export type IChaosBagState = {
	tokenCount: ChaosTokensCount;
	sealedTokens: ChaosBagToken[];
	contents: ChaosBagToken[];
	showRevealModal: boolean;
	revealedTokenIds: string[];
	skillCheckType: InvestigatorBoardStat | null;
	skillValue: number | null;
	loadingAnimation: boolean;
};

const initialState: IChaosBagState = {
	tokenCount: {},
	sealedTokens: [],
	contents: [],
	showRevealModal: false,
	revealedTokenIds: [],
	skillCheckType: null,
	skillValue: null,
	loadingAnimation: true,
};

const state = createSliceState(initialState);

export const chaosBag = createSlice({
	name: "chaosBag",
	...state,
});

export const {
	setTokenCount: setChaosBagTokenCount,
	setContents: setChaosBagContents,
	setSealedTokens: setChaosBagSealedTokens,
	setShowRevealModal: setShowRevealChaosTokenModal,
	setSkillCheckType: setChaosBagSkillCheckType,
	setSkillValue: setChaosBagSkillValue,
	setLoadingAnimation: setChaosBagLoadingAnimation,
	setRevealedTokenIds,
} = chaosBag.actions;

export const {
	selectTokenCount: selectChaosBagTokenCount,
	selectSealedTokens: selectChaosBagSealedTokens,
	selectContents: selectChaosBagContents,
	selectShowRevealModal: selectShowRevealChaosTokenModal,
	selectSkillCheckType: selectChaosBagSkillCheckType,
	selectSkillValue: selectChaosBagSkillValue,
	selectLoadingAnimation: selectChaosBagLoadingAnimation,
	selectRevealedTokenIds,
} = chaosBag.selectors;

export default chaosBag.reducer;
