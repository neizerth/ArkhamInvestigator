import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "../../board";

export const selectBoardByIndex = (index: number) =>
	createSelector(
		[selectInvestigatorBoards, () => index],
		(investigatorBoards) => {
			return investigatorBoards[index];
		},
	);
