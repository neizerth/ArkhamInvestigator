import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "../../board";

export const selectLoadedBoardsCount = createSelector(
	selectInvestigatorBoards,
	(boards) => {
		return boards.filter(({ loaded }) => loaded === true).length;
	},
);
