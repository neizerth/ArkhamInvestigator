import type { AppThunk, BoardId, InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../../../selectors";
import { setBoard } from "../../board";
import { addCurrentHistoryItem } from "../../history";

export const setValueTransaction =
	(value: Partial<InvestigatorBoardValues>, boardId?: BoardId): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);

		dispatch(
			setBoard(
				{
					...board,
					value: {
						...board.value,
						...value,
					},
				},
				boardId,
			),
		);

		dispatch(addCurrentHistoryItem({ value }));
	};
