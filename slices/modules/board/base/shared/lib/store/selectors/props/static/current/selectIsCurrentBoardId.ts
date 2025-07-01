import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardId } from "../selectBoardId";

export const selectIsCurrentBoardId = (boardId: BoardId) =>
	createSelector([selectBoardId(boardId)], (id) => {
		return boardId === "current" || id === boardId;
	});
