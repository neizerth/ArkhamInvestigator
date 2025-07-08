import {
	selectBoardById,
	selectEndTurnStrict,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectBaseTurnEnd = (boardId: BoardId) => {
	return createSelector(
		[selectBoardById(boardId), selectEndTurnStrict],
		(board) => {
			const { value } = board;
			const { actions } = value;

			if (actions > 0) {
				return false;
			}

			return true;
		},
	);
};
