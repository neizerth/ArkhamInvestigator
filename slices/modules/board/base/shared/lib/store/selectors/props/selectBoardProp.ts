import type { BoardId, BoardKey } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropOptions<T extends BoardKey> = {
	boardId: BoardId;
	prop: T;
};

export const selectBoardProp = <T extends BoardKey>({
	boardId,
	prop,
}: SelectBoardPropOptions<T>) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return;
		}

		return board[prop];
	});
