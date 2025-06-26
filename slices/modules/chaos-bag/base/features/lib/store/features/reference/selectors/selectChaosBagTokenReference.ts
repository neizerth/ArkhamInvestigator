import type { BoardId } from "@modules/board/base/shared/model";
import { mergeTokenReferences } from "@modules/chaos-bag/base/shared/lib/features";
import { selectBoardTokenEffectModification } from "@modules/mechanics/chaos-bag/effect/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById, selectReferenceCardTokenEffects } from "@shared/lib";

export const selectChaosBagTokenReference = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardById(boardId),
			selectReferenceCardTokenEffects,
			selectBoardTokenEffectModification(boardId),
		],
		(board, referenceTokens, modification) => {
			if (!board) {
				return referenceTokens;
			}
			const { tokens_reference } = board.investigator;

			const baseMerge = mergeTokenReferences(referenceTokens, tokens_reference);

			const result = mergeTokenReferences(baseMerge, modification);

			return result;
		},
	);
