import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoard, selectReferenceCardTokens } from "@shared/lib";

export const selectChaosBagTokenReference = createSelector(
	[selectCurrentBoard, selectReferenceCardTokens],
	(board, referenceTokens) => {
		if (!board) {
			return referenceTokens;
		}
		const { investigator } = board;

		return [...investigator.tokens_reference, ...referenceTokens];
	},
);
