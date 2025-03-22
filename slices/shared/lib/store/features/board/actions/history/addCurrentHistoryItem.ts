import {
	type AppThunk,
	selectCurrentBoard,
	setCurrentBoard,
} from "@shared/lib/store";
import type { HistoryItem } from "@shared/model";
import { v4 } from "uuid";

type Options = Omit<HistoryItem, "id">;
export const addCurrentHistoryItem =
	(options: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);

		const historyIndex = board.historyIndex + 1;

		const currentHistory = board.history.slice(0, historyIndex);

		const historyItem = {
			...options,
			id: v4(),
		};

		const history = [...currentHistory, historyItem];

		dispatch(
			setCurrentBoard({
				...board,
				history,
				historyIndex,
			}),
		);
	};
