import { createSelector } from "@reduxjs/toolkit";
import type { BoardId, InvestigatorBoard } from "@shared/model";
import { selectBoardById } from "../find/selectBoardById";

type Options<T extends keyof InvestigatorBoard> = {
	boardId?: BoardId;
	prop: T;
	defaultValue?: InvestigatorBoard[T];
};

export const selectBoardProp = <T extends keyof InvestigatorBoard>({
	boardId,
	prop,
	defaultValue,
}: Options<T>) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return defaultValue;
		}

		return board[prop];
	});
