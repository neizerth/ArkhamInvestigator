import type {
	AppThunk,
	BoardId,
	InvestigatorBoardNumericStat,
} from "@shared/model";
import { selectCurrentBoard } from "../../../selectors";
import { setBoard } from "../../board";

type Options = {
	statType: InvestigatorBoardNumericStat;
	value: number;
	boardId?: BoardId;
};

export const setInitialStat =
	({ statType, value, boardId = "current" }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const initialValue = {
			...board.initialValue,
			[statType]: value,
		};

		const data = {
			...board,
			initialValue,
		};
		dispatch(setBoard(data, boardId));
	};
