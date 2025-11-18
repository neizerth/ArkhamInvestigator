import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib/store/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectChaosTokensRevealCount = (boardId: BoardId) =>
	createSelector(
		[
			selectChaosBagTokenValues(boardId),
			selectRevealedTokens,
			selectChaosBagContents,
		],
		(tokenValues) => {
			return tokenValues;
		},
	);
