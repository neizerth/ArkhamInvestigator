import type { BoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { boardHistoryPrefix } from "../../../config";
import type { InvestigatorBoardHistoryItemData } from "../../../model";

export type AddBoardHistoryItemPayload = {
	boardId: BoardId;
	data: InvestigatorBoardHistoryItemData;
};

export const addBoardHistoryItem = createAction<AddBoardHistoryItemPayload>(
	`${boardHistoryPrefix}/addItem`,
);
