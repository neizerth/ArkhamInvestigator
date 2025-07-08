import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";

export const selectNextBoard = createSelector(
	[selectCurrentInvestigatorIndex, selectInvestigatorBoards],
	(index, boards) => {
		if (typeof index !== "number") {
			return;
		}
		const nextIndex = (index + 1) % boards.length;

		return boards[nextIndex];
	},
);
