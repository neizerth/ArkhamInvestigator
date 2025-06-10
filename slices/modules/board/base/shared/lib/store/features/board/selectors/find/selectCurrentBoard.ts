import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorIndex } from "@shared/lib";
import { selectInvestigatorBoards } from "../../board";

export const selectCurrentBoard = createSelector(
	[selectInvestigatorBoards, selectCurrentInvestigatorIndex],
	(boards, index) => boards[index || 0],
);
