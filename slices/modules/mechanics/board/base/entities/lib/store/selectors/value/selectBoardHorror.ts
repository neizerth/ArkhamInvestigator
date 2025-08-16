import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardHorror = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		return Math.max(board.baseValue.sanity - board.value.sanity, 0);
	});
