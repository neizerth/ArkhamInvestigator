import { boardHistoryPrefix } from "@modules/board/history/shared/config";
import type { ChangeHistoryPayload } from "@modules/board/history/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { AddBoardHistoryItemPayload } from "../item";
export type ChangeBoardHistoryItemPayload = AddBoardHistoryItemPayload &
	ChangeHistoryPayload;

export const changeBoardHistory = createAction<ChangeBoardHistoryItemPayload>(
	`${boardHistoryPrefix}/change`,
);
