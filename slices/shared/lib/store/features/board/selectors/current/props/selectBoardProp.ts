import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorBoard } from "@shared/model";
import { selectCurrentBoard } from "../selectCurrentBoard";

export const selectBoardProp = <T extends keyof InvestigatorBoard>(prop: T) =>
	createSelector(
		[selectCurrentBoard],
		(board): InvestigatorBoard[T] => board[prop],
	);
