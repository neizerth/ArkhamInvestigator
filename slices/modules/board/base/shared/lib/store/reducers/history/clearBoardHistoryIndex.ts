import type { BoardReducer } from "@modules/board/base/shared/model";
import {
	type HandleAddBoardHistoryItemOptions,
	handleClearBoardHistoryIndex,
} from "../../handlers/history";

export type ClearBoardHistoryIndexPayload = Omit<
	HandleAddBoardHistoryItemOptions,
	"state"
>;

export const clearBoardHistoryIndex: BoardReducer<
	ClearBoardHistoryIndexPayload
> = (state, { payload }) => {
	handleClearBoardHistoryIndex({
		...payload,
		state,
	});
};
