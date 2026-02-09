import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { getReferencePartTokens } from "@modules/chaos-bag/effect/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardTokenTypes = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		const parts = board.investigator.tokens_reference;

		return parts.flatMap(getReferencePartTokens);
	});
