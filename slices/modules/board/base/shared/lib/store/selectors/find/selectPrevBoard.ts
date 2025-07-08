import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";

export const selectPrevBoard = createSelector(
	[selectCurrentInvestigatorIndex, selectInvestigatorBoards],
	(index, boards) => {
		if (typeof index !== "number") {
			return;
		}
		const prevIndex = Math.max(0, index - 1);

		return boards[prevIndex];
	},
);
