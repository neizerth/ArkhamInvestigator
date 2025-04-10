import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "../selectBoardById";

export const selectIsDefeated = (boardId: number) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return false;
		}
		const { health, sanity } = board.value;

		return health <= 0 || sanity <= 0;
	});
