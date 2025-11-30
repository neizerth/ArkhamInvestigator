import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectRevealHistory } from "../chaosBagRevealHistory";

export const selectRevealHistoryByBoardId = (boardId: BoardId) => {
	return createSelector(
		[selectRevealHistory, selectBoardId(boardId)],
		(history, boardId) => history.filter(propEq(boardId, "boardId")),
	);
};
