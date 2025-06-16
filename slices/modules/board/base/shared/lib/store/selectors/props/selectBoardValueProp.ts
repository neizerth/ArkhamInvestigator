import type {
	BoardId,
	InvestigatorBoardValueProp,
	InvestigatorBoardStat as Key,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropValueOptions<T extends Key> = {
	boardId: BoardId;
	type: InvestigatorBoardValueProp;
	prop: T;
};

export const selectBoardValueProp = <T extends Key>({
	boardId,
	prop,
	type,
}: SelectBoardPropValueOptions<T>) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return;
		}

		return board[type][prop];
	});
