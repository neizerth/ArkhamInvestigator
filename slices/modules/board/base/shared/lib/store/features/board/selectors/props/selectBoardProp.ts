import { createSelector } from "@reduxjs/toolkit";
import type { BoardId, InvestigatorBoard } from "@shared/model";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropOptions<T extends keyof InvestigatorBoard> = {
	boardId: BoardId;
	prop: T;
	defaultValue?: InvestigatorBoard[T];
};

export const selectBoardProp = <T extends keyof InvestigatorBoard>({
	boardId,
	prop,
	defaultValue,
}: SelectBoardPropOptions<T>) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return defaultValue;
		}

		return board[prop];
	});
