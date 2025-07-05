import type {
	BoardId,
	BoardKey,
	InvestigatorBoard,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropOptions<T extends BoardKey> = {
	boardId?: BoardId;
	prop: T;
};

export const selectBoardProp = <T extends BoardKey>({
	boardId,
	prop,
}: SelectBoardPropOptions<T>) =>
	createSelector(
		[selectBoardById(boardId)],
		(board): InvestigatorBoard[T] | undefined => {
			if (!board) {
				return;
			}

			return board[prop];
		},
	);
