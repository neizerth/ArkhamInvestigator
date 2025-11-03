import { resetBoardAbilities } from "@modules/board/abilities/shared/lib";
import {
	isBoardExists,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import type { AppThunk } from "@shared/model";
import { startNewTurn } from "../../features";
import { giveUpkeepResourceToBoard } from "../upkeep";

export const makeAction =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}

		const { actions } = board.value;

		if (actions > 0) {
			const historyGroup = createBoardHistoryGroup();
			dispatch(
				setBoardActualPropValue({
					boardId,
					prop: "actions",
					value: actions - 1,
					history: historyGroup,
				}),
			);

			dispatch(
				resetBoardAbilities({
					boardId,
					limitTypes: ["action"],
					history: historyGroup,
				}),
			);
			return;
		}
		dispatch(startNewTurn({ boardId }));
		dispatch(giveUpkeepResourceToBoard(boardId));
	};
