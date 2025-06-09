import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentStatValues = (stat: InvestigatorBoardNumericStat) =>
	createSelector([selectCurrentBoard], (board) => {
		const { initialValue, baseValue, value } = board;
		return {
			initialValue: initialValue[stat],
			baseValue: baseValue[stat],
			value: value[stat],
		};
	});
