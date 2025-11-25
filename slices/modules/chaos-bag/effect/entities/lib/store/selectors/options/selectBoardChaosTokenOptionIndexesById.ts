import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import {
	selectBoardChaosTokenOptions,
	selectChaosTokenOptions,
} from "@modules/chaos-bag/effect/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectBoardChaosTokenOptionIndexesById = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardId(boardId),
			selectChaosTokenOptions,
			selectBoardChaosTokenOptions,
		],
		(boardId, chaosTokenOptions, boardChaosTokenOptions) => {
			const boardOptions = boardChaosTokenOptions?.[boardId];
			const data = {
				...chaosTokenOptions,
				...boardOptions,
			};

			return data ?? {};
		},
	);
