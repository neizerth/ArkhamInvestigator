import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorBoards } from "../board";

export const selectBoardByCode = (code: string) =>
	createSelector([selectInvestigatorBoards], (boards) => {
		return boards.find(({ investigator }) => investigator.code === code);
	});
