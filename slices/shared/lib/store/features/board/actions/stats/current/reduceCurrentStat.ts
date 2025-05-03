import type { AppThunk } from "@shared/model";
import type { InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/current/selectCurrentBoard";
import { setBoard } from "../../board/setBoard";

import { addCurrentHistoryItem } from "../../history/addCurrentHistoryItem";

export type ReduceCurrentStatOptions = {
	addToHistory?: boolean;
};

export const reduceCurrentStat =
	<T extends keyof InvestigatorBoardValues>(
		type: T,
		reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T],
		options: ReduceCurrentStatOptions = {
			addToHistory: true,
		},
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const currentValue = board.value[type];
		const statValue = reducer(currentValue);

		if (currentValue === statValue) {
			return;
		}

		const value = {
			...board.value,
			[type]: statValue,
		};

		dispatch(
			setBoard({
				...board,
				value,
			}),
		);

		if (!options.addToHistory) {
			return;
		}

		dispatch(
			addCurrentHistoryItem({
				value: {
					[type]: statValue,
				},
			}),
		);
	};
