import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosBagRevealPrefix } from "../../config";
import type { RevealedChaosBagToken } from "../../model";
import * as reducers from "./reducers";

export type ChaosBagRevealState = {
	revealedTokens: RevealedChaosBagToken[];
	skillCheckType: InvestigatorBoardNumericStat | null;
	skillCheckTitle: string | null;
	skillValue: number | null;
	skillCheckExpression: SkillCheckItem[];
	skillCheckBoardId: number | null;

	currentRevealedTokenId: string | null;
};

const initialState: ChaosBagRevealState = {
	revealedTokens: [],
	skillCheckExpression: [],
	skillCheckBoardId: null,
	skillCheckType: null,
	skillCheckTitle: null,
	skillValue: null,
	currentRevealedTokenId: null,
};

const state = createSliceState(initialState);

export const chaosBagReveal = createSlice({
	name: chaosBagRevealPrefix,
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setSkillCheckBoardId: setChaosBagSkillCheckBoardId,
	setSkillCheckType: setChaosBagSkillCheckType,
	setSkillValue: setChaosBagSkillValue,
	setSkillCheckTitle: setChaosBagSkillCheckTitle,
	setSkillCheckExpression: setChaosBagSkillCheckExpression,
	setRevealedTokens,

	addRevealedTokens,
	removeRevealedTokenId,
	startChaosBagRevealInternal,
	endChaosBagReveal,
	setCurrentRevealedTokenId,
	setRevealedTokenValue,
} = chaosBagReveal.actions;

export const {
	selectCurrentRevealedTokenId,
	selectRevealedTokens,
	selectSkillCheckBoardId: selectChaosBagSkillCheckBoardId,
	selectSkillCheckType: selectChaosBagSkillCheckType,
	selectSkillValue: selectChaosBagSkillValue,
	selectSkillCheckTitle: selectChaosBagSkillCheckTitle,
	selectSkillCheckExpression: selectChaosBagSkillCheckExpression,
} = chaosBagReveal.selectors;

export default chaosBagReveal.reducer;
