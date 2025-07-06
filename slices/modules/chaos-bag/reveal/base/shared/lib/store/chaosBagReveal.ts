import type { SkillCheckItem } from "@modules/board/skill-check/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import { chaosBagRevealPrefix } from "../../config";
import * as reducers from "./reducers";

export type ChaosBagRevealState = {
	revealedTokenIds: string[];
	skillCheckType: InvestigatorBoardNumericStat | null;
	skillCheckTitle: string | null;
	skillValue: number | null;
	skillCheckExpression: SkillCheckItem[];

	currentRevealedTokenId: string | null;
};

const initialState: ChaosBagRevealState = {
	revealedTokenIds: [],
	skillCheckExpression: [],
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
	setRevealedTokenIds,
	setSkillCheckType: setChaosBagSkillCheckType,
	setSkillValue: setChaosBagSkillValue,
	setSkillCheckTitle: setChaosBagSkillCheckTitle,
	setSkillCheckExpression: setChaosBagSkillCheckExpression,

	addRevealedTokens,
	removeRevealedTokenId,
	startChaosBagReveal,
	endChaosBagReveal,
	setCurrentRevealedTokenId,
} = chaosBagReveal.actions;

export const {
	selectCurrentRevealedTokenId,
	selectRevealedTokenIds,
	selectSkillCheckType: selectChaosBagSkillCheckType,
	selectSkillValue: selectChaosBagSkillValue,
	selectSkillCheckTitle: selectChaosBagSkillCheckTitle,
	selectSkillCheckExpression: selectChaosBagSkillCheckExpression,
} = chaosBagReveal.selectors;

export default chaosBagReveal.reducer;
