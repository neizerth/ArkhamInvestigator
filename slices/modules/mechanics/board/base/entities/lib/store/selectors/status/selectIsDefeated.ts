import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getIsDefeated } from "../../../logic";

export const selectIsDefeated = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		return getIsDefeated(board.value);
	});
