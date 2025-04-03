import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentStatValues = (stat: InvestigatorBoardStat) =>
	createSelector([selectCurrentBoard], (board) => {
		const { initialValue, baseValue, value } = board;
		return {
			initialValue: initialValue[stat],
			baseValue: baseValue[stat],
			value: value[stat],
		};
	});
