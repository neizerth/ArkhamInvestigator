import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { tokenValueModifications } from "../../../config";

export const selectBoardChaosTokenValueModifications = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectChaosBagContents, selectRevealedTokenIds],
		(board, chaosBagContents, revealedIds) => {
			const { investigator } = board;
			const modification = tokenValueModifications[investigator.code];
			if (!modification) {
				return {};
			}
			return modification({
				board,
				chaosBagContents,
				revealedIds,
			});
		},
	);
