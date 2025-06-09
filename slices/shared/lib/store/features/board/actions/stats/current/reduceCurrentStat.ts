import type { AppThunk, BoardId } from "@shared/model";
import type { InvestigatorBoardValues } from "@shared/model";
import { setBoard } from "../../board/setBoard";

import { selectBoardById } from "../../../selectors";
import { addCurrentHistoryItem } from "../../history/addCurrentHistoryItem";
import { setStatChangeEffect } from "../effects";

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
		options = {},
	}: Options<T>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { boardId, addToHistory = true } = options;
		const board = selectBoardById(boardId)(state);

		if (!board) {
			return;
		}

		const { code } = board.investigator;
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

		if (addToHistory) {
			dispatch(
				addCurrentHistoryItem(
					{
						value: {
							[type]: statValue,
						},
					},
					boardId,
				),
			);
		}

		dispatch(
			setStatChangeEffect({
				code,
				type,
				value: statValue,
				prevValue: currentValue,
			}),
		);
	};
