import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import type { AppThunk, BoardId } from "@shared/model";
import { selectBoardById } from "../../selectors/find/selectBoardById";
import { setBoard } from "./setBoard";

type Key = keyof InvestigatorBoard;
export type SetBoardPropOptions<T extends Key> = {
	prop: T;
	value: InvestigatorBoard[T];
	boardId: BoardId;
};

export const setBoardProp =
	<T extends Key>({ prop, value, boardId }: SetBoardPropOptions<T>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!board) {
			return;
		}

		const data = {
			...board,
			[prop]: value,
		};

		dispatch(
			setBoard({
				board: data,
				boardId,
			}),
		);
	};
