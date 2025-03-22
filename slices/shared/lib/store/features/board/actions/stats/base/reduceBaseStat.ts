import type { ActionCreator } from "@reduxjs/toolkit";
import { type AppThunk } from "@shared/lib/store";
import type {
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/selectCurrentBoard";
import { setCurrentBoard } from "../../board/setCurrentBoard";
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

		const statBaseValue = reducer(board.baseValue[type]);

		const baseValue = {
			...board.baseValue,
			[type]: statBaseValue,
		};

		dispatch(
			setCurrentBoard({
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
