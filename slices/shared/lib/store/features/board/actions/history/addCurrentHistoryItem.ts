import type { AppThunk } from "@shared/model";

import type { HistoryItem } from "@shared/model";
import { v4 } from "uuid";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setBoard } from "../board/setBoard";

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
			setBoard({
				...board,
				history,
				historyIndex,
			}),
		);
	};
