import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoard } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectCurrentBoardProp = <T extends keyof InvestigatorBoard>(
	prop: T,
) =>
	createSelector([selectCurrentBoard], (board): InvestigatorBoard[T] => {
		return board[prop];
	});
