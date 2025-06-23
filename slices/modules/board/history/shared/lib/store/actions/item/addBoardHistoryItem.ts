import type {
	PropsWithBoard,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { boardHistoryPrefix } from "../../../../config";
import type {
	InvestigatorBoardHistoryItem,
	InvestigatorBoardHistoryItemData,
} from "../../../../model";

export type AddBoardHistoryItemPayload = PropsWithBoardId &
	PropsWithBoard & {
		data: InvestigatorBoardHistoryItemData;
	};

export const addBoardHistoryItem = createAction<AddBoardHistoryItemPayload>(
	`${boardHistoryPrefix}/addItem`,
);

export type BoardHistoryItemAddedPayload = PropsWithBoardId &
	PropsWithBoard & {
		code: string;
		item: InvestigatorBoardHistoryItem;
	};

export const boardHistoryItemAdded = createAction<BoardHistoryItemAddedPayload>(
	`${boardHistoryPrefix}/itemAdded`,
);
