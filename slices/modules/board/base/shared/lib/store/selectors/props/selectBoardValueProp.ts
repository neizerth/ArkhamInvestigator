import type {
	BoardId,
	InvestigatorBoardValueProp,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorNumericStat } from "@shared/model";
import { selectBoardById } from "../find/selectBoardById";

export type SelectBoardPropValueOptions = {
	boardId: BoardId;
	type: InvestigatorBoardValueProp;
	prop: InvestigatorNumericStat;
};

export const selectBoardValueProp = ({
	boardId,
	prop,
	type,
}: SelectBoardPropValueOptions) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!board) {
			return;
		}

		return board[type][prop];
	});
