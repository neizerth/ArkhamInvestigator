import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardChaosOddsTokens } from "./selectBoardChaosOddsTokens";

export const selectBoardChaosBagOddsOptions = (boardId: BoardId) =>
	createSelector([selectBoardChaosOddsTokens(boardId)], (tokens) => {
		const available = tokens.filter(({ revealId }) => !revealId);
		const revealed = tokens.filter(({ revealId }) => revealId);

		return {
			available,
			revealed,
		};
	});
