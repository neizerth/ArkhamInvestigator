import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { getChaosBagTokenReferenceEffects } from "@modules/chaos-bag/effect/entities/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectSignatureEffects = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		return getChaosBagTokenReferenceEffects(
			board.investigator.tokens_reference,
		);
	});
