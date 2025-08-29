import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleUnloadAllBoards } from "./handleUnloadAllBoards";

export const unloadAllBoardsReducer: BoardReducer = (state, { payload }) => {
	handleUnloadAllBoards(state, payload);
};
