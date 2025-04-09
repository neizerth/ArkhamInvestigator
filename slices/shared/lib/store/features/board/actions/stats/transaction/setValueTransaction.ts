import type { AppThunk, InvestigatorBoardValues } from "@shared/model";
import { selectCurrentBoard } from "../../../selectors";
import { setCurrentBoard } from "../../board";
import { addCurrentHistoryItem } from "../../history";

export const setValueTransaction =
	(value: Partial<InvestigatorBoardValues>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);

		dispatch(
			setCurrentBoard({
				...board,
				value: {
					...board.value,
					...value,
				},
			}),
		);

		dispatch(addCurrentHistoryItem({ value }));
	};
