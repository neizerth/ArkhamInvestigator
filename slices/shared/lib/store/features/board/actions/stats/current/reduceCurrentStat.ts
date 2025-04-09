import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type {
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/current/selectCurrentBoard";
import { setCurrentBoard } from "../../board/setCurrentBoard";

import { addCurrentHistoryItem } from "../../history/addCurrentHistoryItem";

export type ReduceCurrentStatOptions = {
	addToHistory?: boolean;
};

export const reduceCurrentStat: ActionCreator<AppThunk> =
	<T extends InvestigatorBoardStat>(
		type: T,
		reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T],
		options: ReduceCurrentStatOptions = {
			addToHistory: true,
		},
	) =>
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
			setCurrentBoard({
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
