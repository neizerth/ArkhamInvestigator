import type { BoardId, BoardReducer } from "@modules/board/base/shared/model";
import { handleClearBoardHistory } from "./handleClearBoardHistory";

export const clearBoardHistoryReducer: BoardReducer<BoardId> = (
	state,
	{ payload },
) => {
	handleClearBoardHistory(state, payload);
};
