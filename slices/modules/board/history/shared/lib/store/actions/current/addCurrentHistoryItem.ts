import type { OmitBoard } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { boardHistoryPrefix } from "../../../../config";
import type { AddBoardHistoryItemPayload } from "../addBoardHistoryItem";

export type AddCurrentHistoryItemPayload =
	OmitBoard<AddBoardHistoryItemPayload>;

export const addCurrentHistoryItem = createAction<AddCurrentHistoryItemPayload>(
	`${boardHistoryPrefix}/addCurrentItem`,
);
