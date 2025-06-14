import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type HandleAddBoardHistoryItemOptions,
	handleAddBoardHistoryItem,
} from "../../handlers/history";

export type AddBoardHistoryItemPayload = Omit<
	HandleAddBoardHistoryItemOptions,
	"state"
>;

export const addBoardHistoryItem: BoardReducer<AddBoardHistoryItemPayload> = (
	state,
	{ payload },
) => {
	handleAddBoardHistoryItem({
		...payload,
		state,
	});
};
