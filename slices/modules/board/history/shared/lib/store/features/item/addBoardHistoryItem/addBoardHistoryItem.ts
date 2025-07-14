import type {
	PropsWithBoard,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { boardHistoryPrefix } from "@modules/board/history/shared/config";
import type {
	InvestigatorBoardHistoryItem,
	InvestigatorBoardHistoryItemData,
} from "@modules/board/history/shared/model";
import { createAction } from "@reduxjs/toolkit";
export type AddBoardHistoryItemPayload = PropsWithBoardId &
	PropsWithBoard & {
		data: InvestigatorBoardHistoryItemData;
		id?: string;
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
