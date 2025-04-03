import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "../board";

export const selectBoardsCount = createSelector(
	[selectInvestigatorBoards],
	({ length }) => length,
);
