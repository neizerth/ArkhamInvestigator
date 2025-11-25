import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectReferenceCardTokens } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectChaosTokensRevealCount = (boardId: BoardId) =>
	createSelector(
		[selectRevealedTokens, selectChaosBagContents, selectReferenceCardTokens],
		(tokenValues) => {
			return tokenValues;
		},
	);
