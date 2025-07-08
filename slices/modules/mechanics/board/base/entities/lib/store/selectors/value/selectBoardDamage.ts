import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardDamage = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		return Math.min(board.baseValue.health - board.value.health, 0);
	});
