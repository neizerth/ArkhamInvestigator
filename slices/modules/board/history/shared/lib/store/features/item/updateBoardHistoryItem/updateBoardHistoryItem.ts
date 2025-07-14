import type { BoardId } from "@modules/board/base/shared/model";
import { boardHistoryPrefix } from "@modules/board/history/shared/config";
import type { InvestigatorBoardHistoryItemData } from "@modules/board/history/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type UpdateBoardHistoryItemPayload = {
	boardId: BoardId;
	id: string;
	data: InvestigatorBoardHistoryItemData;
};

export const updateBoardHistoryItem =
	createAction<UpdateBoardHistoryItemPayload>(
		`${boardHistoryPrefix}/updateItem`,
	);
