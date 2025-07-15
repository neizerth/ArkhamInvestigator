import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { mergeReferenceTokenEffects } from "@modules/chaos-bag/effect/entities/lib";
import { selectBoardTokenEffectModification } from "@modules/mechanics/chaos-bag/effect/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenEffects } from "@shared/lib";

export const selectChaosBagTokenReference = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardById(boardId),
			selectReferenceCardTokenEffects,
			selectBoardTokenEffectModification(boardId),
		],
		(board, referenceTokens, modification) => {
			const baseMerge = mergeReferenceTokenEffects(
				referenceTokens,
				board.investigator.tokens_reference,
			);

			const result = mergeReferenceTokenEffects(baseMerge, modification);

			return result;
		},
	);
