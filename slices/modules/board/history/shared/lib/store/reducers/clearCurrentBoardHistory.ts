import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleClearBoardHistory } from "../handlers";

export const clearCurrentBoardHistory: BoardReducer = (state) => {
	handleClearBoardHistory(state, "current");
};
