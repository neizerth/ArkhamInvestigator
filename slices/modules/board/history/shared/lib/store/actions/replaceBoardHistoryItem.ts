import type { BoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { boardHistoryPrefix } from "../../../config";
import type { InvestigatorBoardHistoryItemData } from "../../../model";

export type ReplaceBoardHistoryItemPayload = {
	boardId: BoardId;
	id: string;
	data: InvestigatorBoardHistoryItemData;
};

export const replaceBoardHistoryItem =
	createAction<ReplaceBoardHistoryItemPayload>(
		`${boardHistoryPrefix}/replaceItem`,
	);
