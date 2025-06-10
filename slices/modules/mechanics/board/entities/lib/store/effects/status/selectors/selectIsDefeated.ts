import { selectBoardById } from "@modules/board/base/shared/lib/store/features/board/selectors/find/selectBoardById";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectIsDefeated = (boardId?: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return false;
		}
		const { health, sanity } = board.value;

		return health <= 0 || sanity <= 0;
	});
