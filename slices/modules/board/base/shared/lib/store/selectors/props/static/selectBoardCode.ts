import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "../../find/selectBoardById";

export const selectBoardCode = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId)],
		(board) => board?.investigator.code,
	);
