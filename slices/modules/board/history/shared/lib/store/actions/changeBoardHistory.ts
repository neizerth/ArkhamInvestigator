import { createAction } from "@reduxjs/toolkit";
import { boardHistoryPrefix } from "../../../config";
import type { ChangeHistoryPayload } from "../../../model";
import type { AddBoardHistoryItemPayload } from "./item/addBoardHistoryItem";

export type ChangeBoardHistoryItemPayload = AddBoardHistoryItemPayload &
	ChangeHistoryPayload;

export const changeBoardHistory = createAction<ChangeBoardHistoryItemPayload>(
	`${boardHistoryPrefix}/change`,
);
