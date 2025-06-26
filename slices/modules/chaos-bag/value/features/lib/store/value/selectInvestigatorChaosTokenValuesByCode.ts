import { selectInvestigatorChaosTokenValue } from "@features/game/chaos-bag";
import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";

export const selectInvestigatorChaosTokenValuesByCode = (boardId: BoardId) =>
	createSelector(
		[selectInvestigatorChaosTokenValue, selectBoardId(boardId)],
		(value, boardId) => {
			if (!value || !boardId) {
				return {};
			}
			return value[boardId] || {};
		},
	);
