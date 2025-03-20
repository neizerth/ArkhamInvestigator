import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import type { InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/selectCurrentBoard";
import { setCurrentBoard } from "../../board/setCurrentBoard";

export const reduceBaseStat: ActionCreator<AppThunk> =
	<T extends keyof InvestigatorBoardValues>(
		type: T,
		reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T],
	) =>
	(dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const statValue = reducer(board.baseValue[type]);

		const baseValue = {
			...board.baseValue,
			[type]: statValue,
		};

		dispatch(
			setCurrentBoard({
				...board,
				baseValue,
			}),
		);
	};
