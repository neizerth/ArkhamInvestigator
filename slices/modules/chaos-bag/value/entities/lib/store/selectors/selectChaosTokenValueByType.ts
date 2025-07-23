import type { BoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagTokenValues } from "./selectChaosBagTokenValues";

type Options = {
	boardId: BoardId;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, boardId }: Options) =>
	createSelector([selectChaosBagTokenValues(boardId)], (data) => {
		return data[type] || 0;
	});
