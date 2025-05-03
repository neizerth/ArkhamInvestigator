import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { selectEndTurnStrict } from "../../../board";
import { selectBoardById } from "../../selectBoardById";

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
