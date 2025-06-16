import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectBoardById } from "../../find/selectBoardById";

export const selectBoardId = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => board?.id);
