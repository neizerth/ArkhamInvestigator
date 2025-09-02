import type { BoardReducer } from "@modules/board/base/shared/model";
import { handleSetPrevBoardIndexIndex } from "./handleSetNextBoardIndex";

export const setPrevBoardIndexReducer: BoardReducer = (state, { payload }) => {
	handleSetPrevBoardIndexIndex(state, payload);
};
