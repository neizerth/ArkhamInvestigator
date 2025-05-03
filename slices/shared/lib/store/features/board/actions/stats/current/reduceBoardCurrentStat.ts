import type {
	AppThunk,
	BoardId,
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@shared/model";
import { selectBoardById } from "../../../selectors";
import { setBoard } from "../../board";

type Options<T extends InvestigatorBoardStat> = {
	boardId: BoardId;
	type: T;
	reducer: (value: InvestigatorBoardValues[T]) => InvestigatorBoardValues[T];
};
export const reduceBoardCurrentStat =
	<T extends InvestigatorBoardStat>({
		boardId,
		type,
		reducer,
	}: Options<T>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

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
	};
