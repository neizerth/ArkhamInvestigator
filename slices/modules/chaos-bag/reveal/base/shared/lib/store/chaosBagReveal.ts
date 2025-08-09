import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { identity } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosBagRevealPrefix } from "../../config";
import type { RevealedChaosBagToken } from "../../model";
import * as reducers from "./reducers";

export type ChaosBagRevealState = {
	revealedTokens: RevealedChaosBagToken[];
	allRevealedTokens: RevealedChaosBagToken[];
	skillCheckType: InvestigatorBoardNumericStat | null;
	skillCheckTitle: string | null;
	skillValue: number | null;
	skillCheckExpression: SkillCheckItem[];
	skillCheckBoardId: number | null;

	currentRevealedTokenId: string | null;
	result: ChaosTokenValue | null;
	succeedBy: number | null;
};

const initialState: ChaosBagRevealState = {
	revealedTokens: [],
	allRevealedTokens: [],
	skillCheckExpression: [],
	skillCheckBoardId: null,
	skillCheckType: null,
	skillCheckTitle: null,
	skillValue: null,
	currentRevealedTokenId: null,
	result: null,
	succeedBy: null,
};

const state = createSliceState(initialState);

export const chaosBagReveal = createSlice({
	name: chaosBagRevealPrefix,
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
	selectors: {
		...state.selectors,
		selectChaosBagReveal: identity,
	},
});

export const {
	setSkillCheckBoardId: setChaosBagSkillCheckBoardId,
	setSkillCheckType: setChaosBagSkillCheckType,
	setSkillValue: setChaosBagSkillValue,
	setSkillCheckTitle: setChaosBagSkillCheckTitle,
	setSkillCheckExpression: setChaosBagSkillCheckExpression,
	setResult: setChaosBagRevealResult,
	setSucceedBy: setChaosBagSucceedBy,
	setRevealedTokens,
	setAllRevealedTokens,

	addRevealedTokens,
	removeRevealedTokenId,
	startChaosBagRevealInternal,
	endChaosBagRevealInternal,
	setCurrentRevealedTokenId,
	setRevealedTokenValue,
	updateRevealedToken,
	syncRevealedValuesWithContents,
} = chaosBagReveal.actions;

export const {
	selectCurrentRevealedTokenId,
	selectRevealedTokens,
	selectAllRevealedTokens,
	selectSkillCheckBoardId: selectChaosBagSkillCheckBoardId,
	selectSkillCheckType: selectChaosBagSkillCheckType,
	selectSkillValue: selectChaosBagSkillValue,
	selectSkillCheckTitle: selectChaosBagSkillCheckTitle,
	selectSkillCheckExpression: selectChaosBagSkillCheckExpression,
	selectResult: selectChaosBagRevealResult,
	selectSucceedBy: selectChaosBagSucceedBy,
	selectChaosBagReveal,
} = chaosBagReveal.selectors;

export default chaosBagReveal.reducer;
