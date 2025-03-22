import type { ActionCreator } from "@reduxjs/toolkit";
import { addCurrentHistoryItem, type AppThunk } from "@shared/lib/store";
import type { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { v4 } from "uuid";
import { selectCurrentBoard } from "../../../selectors/selectCurrentBoard";
import { setCurrentBoard } from "../../board/setCurrentBoard";

export type ReduceCurrentStatOptions = {
	addToHistory?: boolean
}

export const reduceCurrentStat: ActionCreator<AppThunk> =
	<T extends InvestigatorBoardStat>(
		type: T,
		reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T],
		options: ReduceCurrentStatOptions = {
			addToHistory: true
		}
	) =>
	(dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const statValue = reducer(board.value[type]);

		const value = {
			...board.value,
			[type]: statValue,
		}

		dispatch(
			setCurrentBoard({
				...board,
				value
			}),
		)

		if (!options.addToHistory) {
			return;
		}

		dispatch(
			addCurrentHistoryItem({
				value: {
					[type]: statValue
				}
			})
		)
	};
