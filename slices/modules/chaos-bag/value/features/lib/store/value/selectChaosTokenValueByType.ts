import type { BoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectDefaultBoardTokenValues } from "./selectDefaultBoardTokenValues";

type Options = {
	boardId: BoardId;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, boardId }: Options) =>
	createSelector([selectDefaultBoardTokenValues(boardId)], (data) => {
		return data[type] || 0;
	});
