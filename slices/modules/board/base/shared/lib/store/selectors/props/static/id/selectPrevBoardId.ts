import type { RootState } from "@shared/model";
import { selectPrevBoard } from "../../../find";

export const selectPrevBoardId = (state: RootState) => {
	const board = selectPrevBoard(state);
	return board?.id;
};
