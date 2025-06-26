import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getReferenceCardTokenValues } from "../../getReferenceCardTokenValues";

export const selectBoardRefenceCardTokenValues = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return {};
		}
		const { tokens } = board.investigator;

		return getReferenceCardTokenValues(tokens);
	});
