import type { AppThunkCreator } from "@shared/model";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setBoard } from "../board/setBoard";

export const clearHistory: AppThunkCreator = () => (dispatch, getState) => {
	const state = getState();
	const board = selectCurrentBoard(state);

	if (!board) {
		return;
	}

	dispatch(
		setBoard({
			...board,
			history: [],
			historyIndex: -1,
		}),
	);
};
