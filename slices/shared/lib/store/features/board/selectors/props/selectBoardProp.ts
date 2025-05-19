import { createSelector } from "@reduxjs/toolkit";
import type { BoardId, InvestigatorBoard } from "@shared/model";
import { selectBoardById } from "../selectBoardById";

export const selectBoardProp = <T extends keyof InvestigatorBoard>(
	boardId: BoardId,
	prop: T,
	defaultValue?: InvestigatorBoard[T],
) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return defaultValue;
		}

		return board[prop];
	});
