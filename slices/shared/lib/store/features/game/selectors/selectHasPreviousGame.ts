import {
	isBoardExists,
	selectCurrentBoard,
} from "@modules/board/base/shared/lib";
import type { RootState } from "@shared/model";

export const selectHasPreviousGame = (state: RootState) => {
	const board = selectCurrentBoard(state);
	return isBoardExists(board);
};
