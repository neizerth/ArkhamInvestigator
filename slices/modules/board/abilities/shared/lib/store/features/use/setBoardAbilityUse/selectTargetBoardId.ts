import {
	selectBoardId,
	selectBoardsCount,
	selectCurrentBoardId,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectTargetBoardId = (boardId: BoardId = "current") =>
	createSelector(
		[selectBoardsCount, selectBoardId(boardId), selectCurrentBoardId],
		(boardsCount, targetBoardId, currentBoardId) => {
			if (boardsCount === 1) {
				return currentBoardId;
			}

			if (!boardId) {
				return;
			}

			return targetBoardId;
		},
	);
