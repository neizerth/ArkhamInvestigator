import type { RootState } from "@shared/model";
import { selectNextBoard } from "../../../find";

export const selectNextBoardId = (state: RootState) => {
	const board = selectNextBoard(state);
	return board?.id;
};
