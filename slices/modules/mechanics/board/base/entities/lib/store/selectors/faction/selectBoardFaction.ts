import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getBoardFaction } from "../../../logic";

export const selectBoardFaction = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		return getBoardFaction(board);
	});
