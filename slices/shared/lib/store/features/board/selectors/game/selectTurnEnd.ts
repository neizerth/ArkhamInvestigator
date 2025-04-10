import { createSelector } from "@reduxjs/toolkit";
import { getIsTurnEnd } from "../../../../../features";
import { selectEndTurnStrict } from "../../board";
import { selectBoardById } from "../selectBoardById";

export const selectTurnEnd = (boardId: number) =>
	createSelector(
		[selectBoardById(boardId), selectEndTurnStrict],
		(board, strict) => {
			if (!board) {
				return false;
			}

			return getIsTurnEnd({
				board,
				strict,
			});
		},
	);
