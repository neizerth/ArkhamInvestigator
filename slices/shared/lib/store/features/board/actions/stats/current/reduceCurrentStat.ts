import type { AppThunk, BoardId } from "@shared/model";
import type { InvestigatorBoardValues } from "@shared/model";
import { setBoard } from "../../board/setBoard";

import { selectBoardById } from "../../../selectors";
import { addCurrentHistoryItem } from "../../history/addCurrentHistoryItem";

export type ReduceCurrentStatOptions = {
	addToHistory?: boolean;
	boardId?: BoardId;
};

type Options<T extends keyof InvestigatorBoardValues> = {
	type: T;
	reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T];
	options?: ReduceCurrentStatOptions;
};

export const reduceCurrentStat =
	<T extends keyof InvestigatorBoardValues>({
		type,
		reducer,
		options = {
			addToHistory: true,
		},
	}: Options<T>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { boardId } = options;
		const board = selectBoardById(boardId)(state);

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
			setBoard(
				{
					...board,
					value,
				},
				boardId,
			),
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
