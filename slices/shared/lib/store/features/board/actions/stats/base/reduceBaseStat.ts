import type { AppThunk } from "@shared/model";
import type {
	InvestigatorBoardNumericStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { selectCurrentBoard } from "../../../selectors/current/selectCurrentBoard";
import { setBoard } from "../../board/setBoard";
import { addCurrentHistoryItem } from "../../history/addCurrentHistoryItem";

export type ReduceBaseStatOptions = {
	addToHistory?: boolean;
};

export const reduceBaseStat =
	<T extends InvestigatorBoardNumericStat>(
		type: T,
		reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T],
		options: ReduceBaseStatOptions = {
			addToHistory: true,
		},
	): AppThunk =>
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
