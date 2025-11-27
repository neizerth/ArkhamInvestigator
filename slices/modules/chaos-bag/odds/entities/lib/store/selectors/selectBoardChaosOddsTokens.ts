import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectBoardChaosBagRevealCount } from "@modules/chaos-bag/effect/entities/lib";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getBoardChaosOddsTokens } from "../../logic";

export const selectBoardChaosOddsTokens = (boardId: BoardId) =>
	createSelector(
		[
			selectChaosBagContents,
			selectRevealedTokens,
			selectBoardChaosBagRevealCount(boardId),
			selectChaosBagTokenValues(boardId),
		],
		(contents, revealedTokens, revealCount, values) => {
			return getBoardChaosOddsTokens({
				contents,
				revealedTokens,
				revealCount,
				values,
			});
		},
	);
