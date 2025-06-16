import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectBoardById } from "../../find/selectBoardById";

export const selectBoardCode = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId)],
		(board) => board?.investigator.code,
	);
