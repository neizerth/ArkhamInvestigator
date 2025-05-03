import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type {
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/current/selectCurrentBoard";
import { setBoard } from "../../board/setBoard";
import { addCurrentHistoryItem } from "../../history/addCurrentHistoryItem";

export type ReduceBaseStatOptions = {
	addToHistory?: boolean;
};

export const reduceBaseStat: ActionCreator<AppThunk> =
	<T extends InvestigatorBoardStat>(
		type: T,
		reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T],
		options: ReduceBaseStatOptions = {
			addToHistory: true,
		},
	) =>
	(dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const currentValue = board.baseValue[type];
		const statBaseValue = reducer(currentValue);

		if (currentValue === statBaseValue) {
			return;
		}

		const baseValue = {
			...board.baseValue,
			[type]: statBaseValue,
		};

		dispatch(
			setBoard({
				...board,
				baseValue,
			}),
		);

		if (!options.addToHistory) {
			return;
		}

		dispatch(
			addCurrentHistoryItem({
				baseValue: {
					[type]: statBaseValue,
				},
			}),
		);
	};
