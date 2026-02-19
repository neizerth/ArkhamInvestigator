import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { selectBoardById } from "../../../find/selectBoardById";

export const selectBoardId = (boardId: BoardId) => (state: RootState) =>
	select(state, boardId);

const select = createSelector(
	[
		(_, boardId: BoardId) => boardId,
		(state, boardId: BoardId) => selectBoardById(boardId)(state),
	],
	(_, board) => board?.id,
);
