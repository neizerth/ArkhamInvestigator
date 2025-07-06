import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectBoardChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardTokenValues = (boardId?: BoardId) =>
	createSelector(
		[selectBoardChaosTokenValue, selectBoardId(boardId)],
		(value, boardId) => {
			if (!value || !boardId) {
				return {};
			}
			return value[boardId] || {};
		},
	);
