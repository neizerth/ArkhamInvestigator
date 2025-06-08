import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById, selectReferenceCardTokens } from "@shared/lib";
import type { BoardId } from "@shared/model";

export const selectChaosBagTokenReference = (boardId: BoardId = "current") =>
	createSelector(
		[selectBoardById(boardId), selectReferenceCardTokens],
		(board, referenceTokens) => {
			if (!board) {
				return referenceTokens;
			}
			const { investigator } = board;

			return [...investigator.tokens_reference, ...referenceTokens];
		},
	);
