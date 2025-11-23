import { selectBoardId } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	selectBoardChaosTokenOptions,
	selectChaosTokenOptions,
} from "@modules/chaos-bag/effect/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export type SelectCurrentChaosTokenOptionIndexOptions = PropsWithBoardId & {
	type: ChaosTokenType;
};

export const selectCurrentChaosTokenOptionIndex = ({
	boardId,
	type,
}: SelectCurrentChaosTokenOptionIndexOptions) =>
	createSelector(
		[
			selectBoardId(boardId),
			selectChaosTokenOptions,
			selectBoardChaosTokenOptions,
		],
		(boardId, chaosTokenOptions, boardChaosTokenOptions) => {
			const boardIndex = boardChaosTokenOptions?.[type]?.[boardId] ?? null;
			const globalIndex = chaosTokenOptions?.[type] ?? null;
			const index = boardIndex ?? globalIndex;

			return index;
		},
	);
