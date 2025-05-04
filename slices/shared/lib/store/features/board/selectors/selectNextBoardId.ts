import { createSelector } from "@reduxjs/toolkit";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../board";

export const selectNextBoardId = createSelector(
	[selectInvestigatorBoards, selectCurrentInvestigatorIndex],
	(boards, index) => {
		const currentIndex = index || 0;
		const nextIndex = (currentIndex + 1) % boards.length;

		return boards[nextIndex].id;
	},
);
