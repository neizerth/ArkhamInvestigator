import { createSelector } from "@reduxjs/toolkit";
import { createFallbackBoard } from "../../../fallback";
import { selectInvestigatorBoards } from "../../board";

const fallbackBoard = createFallbackBoard();

export const selectBoardByCode = (code: string) =>
	createSelector([selectInvestigatorBoards], (boards) => {
		const board = boards.find(({ investigator }) => investigator.code === code);
		return board || fallbackBoard;
	});
