import type { BoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { boardHistoryPrefix } from "../../../config";

export type ClearBoardHistoryPayload = {
	boardId: BoardId;
};

export const clearBoardHistory = createAction<ClearBoardHistoryPayload>(
	`${boardHistoryPrefix}/clear`,
);
