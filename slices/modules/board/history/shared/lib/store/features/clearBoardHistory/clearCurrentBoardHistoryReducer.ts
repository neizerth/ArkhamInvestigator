import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleClearBoardHistory } from "./handleClearBoardHistory";

export const clearCurrentBoardHistoryReducer: BoardReducer = (state) => {
	handleClearBoardHistory(state, "current");
};
