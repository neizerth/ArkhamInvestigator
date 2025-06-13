import {
	selectBoardById,
	selectEndTurnStrict,
} from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";

export const selectBaseTurnEnd = (boardId: BoardId) => {
	return createSelector(
		[selectBoardById(boardId), selectEndTurnStrict],
		(board) => {
			if (!board) {
				return false;
			}

			const { value } = board;
			const { actions } = value;

			if (actions > 0) {
				return false;
			}

			return true;
		},
	);
};
