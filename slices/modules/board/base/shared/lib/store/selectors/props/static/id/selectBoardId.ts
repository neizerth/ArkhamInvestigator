import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "../../../find/selectBoardById";

export const selectBoardId = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => board?.id);
