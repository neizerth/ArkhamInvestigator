import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById, selectReferenceCardTokenEffects } from "@shared/lib";
import type { BoardId } from "@shared/model";
import { mergeTokenReferences } from "../../../../../reference";
import { selectSpecialReferenceCardTokensModification as selectModification } from "./investigator";

export const selectChaosBagTokenReference = (boardId: BoardId = "current") =>
	createSelector(
		[
			selectBoardById(boardId),
			selectReferenceCardTokenEffects,
			selectModification(boardId),
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
