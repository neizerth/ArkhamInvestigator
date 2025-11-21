import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getReferencePartTokens } from "../../logic";

export const selectBoardTokenTypes = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		const parts = board.investigator.tokens_reference;

		return parts.flatMap(getReferencePartTokens);
	});
