import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoard } from "@shared/model";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../board";

export const selectCurrentBoard = createSelector(
	[selectCurrentInvestigatorIndex, selectInvestigatorBoards],
	(index, boards): InvestigatorBoard => {
		return boards[index || 0];
	},
);
