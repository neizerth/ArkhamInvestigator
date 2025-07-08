import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenEffects } from "@shared/lib";
import { tokenEffectModifications } from "../../../config";

export const selectBoardTokenEffectModification = (boardId: BoardId) =>
	createSelector(
		[selectBoardById(boardId), selectReferenceCardTokenEffects],
		(board, reference) => {
			if (!isBoardExists(board)) {
				return [];
			}

			const { code } = board.investigator;

			const modification = tokenEffectModifications[code];

			if (!modification) {
				return [];
			}

			return modification({ reference });
		},
	);
