import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type HandleAddBoardHistoryItemOptions,
	handleAddBoardHistoryItem,
} from "../handlers/history";

export type HandleAddBoardHistoryItemPayload = Omit<
	HandleAddBoardHistoryItemOptions,
	"state"
>;

export const addBoardHistoryItem: BoardReducer<
	HandleAddBoardHistoryItemPayload
> = (state, { payload }) => {
	handleAddBoardHistoryItem({
		...payload,
		state,
	});
};
