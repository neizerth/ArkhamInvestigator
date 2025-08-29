import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectInvestigatorBoards } from "../../board";

export const selectUnloadedBoardIds = createSelector(
	[selectInvestigatorBoards],
	(boards) => {
		return boards.filter((board) => !board.loaded).map(prop("id"));
	},
);
