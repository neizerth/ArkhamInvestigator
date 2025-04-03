import type { AppThunk } from "@shared/lib";
import type { InvestigatorBoard } from "@shared/model";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setCurrentBoard } from "./setCurrentBoard";

export const setCurrentBoardProp =
	<T extends keyof InvestigatorBoard>(
		prop: T,
		value: InvestigatorBoard[T],
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);

		dispatch(
			setCurrentBoard({
				...board,
				[prop]: value,
			}),
		);
	};
