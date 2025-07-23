import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectInvestigatorBoards } from "../../../../board";

export const selectBoardIds = createSelector(
	[selectInvestigatorBoards],
	(boards = []) => boards.map(prop("id")),
);
