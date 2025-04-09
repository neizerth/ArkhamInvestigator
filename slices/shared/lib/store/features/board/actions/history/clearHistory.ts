import type { AppThunkCreator } from "@shared/model";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setCurrentBoard } from "../board/setCurrentBoard";

export const clearHistory: AppThunkCreator = () => (dispatch, getState) => {
	const state = getState();
	const board = selectCurrentBoard(state);

	if (!board) {
		return;
	}

	dispatch(
		setCurrentBoard({
			...board,
			history: [],
			historyIndex: -1,
		}),
	);
};
