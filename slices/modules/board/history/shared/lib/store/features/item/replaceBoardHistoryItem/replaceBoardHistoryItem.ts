import type { BoardId } from "@modules/board/base/shared/model";
import { boardHistoryPrefix } from "@modules/board/history/shared/config";
import type { InvestigatorBoardHistoryItemData } from "@modules/board/history/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type ReplaceBoardHistoryItemPayload = {
	boardId: BoardId;
	id: string;
	data: InvestigatorBoardHistoryItemData;
};

export const replaceBoardHistoryItem =
	createAction<ReplaceBoardHistoryItemPayload>(
		`${boardHistoryPrefix}/replaceItem`,
	);
