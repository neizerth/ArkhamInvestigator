import {
	selectBoardId,
	selectBoardsCount,
	selectCurrentBoardId,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";

export const selectTargetBoardId =
	(boardId: BoardId = "current") =>
	(state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		(_, boardId: BoardId) => boardId,
		(state, boardId: BoardId) => selectBoardId(boardId)(state),
		selectBoardsCount,
		selectCurrentBoardId,
	],
	(boardId, targetBoardId, boardsCount, currentBoardId) => {
		if (boardsCount === 1) {
			return currentBoardId;
		}

		if (!boardId) {
			return;
		}

		return targetBoardId;
	},
);
