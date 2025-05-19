import type { AppThunk, BoardId } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import { selectBoardById } from "../../selectors";
import { setBoard } from "./setBoard";

export const setBoardProp =
	<T extends keyof InvestigatorBoard>(
		prop: T,
		value: InvestigatorBoard[T],
		boardId: BoardId = "current",
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		dispatch(
			setBoard(
				{
					...board,
					[prop]: value,
				},
				boardId,
			),
		);
	};
