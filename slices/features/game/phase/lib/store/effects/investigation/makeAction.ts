import { resetBoardAbilities } from "@modules/board/abilities/shared/lib";
import {
	isBoardExists,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import { startNewTurn } from "../common/startNewTurn";
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
			dispatch(
				setBoardActualPropValue({
					boardId,
					prop: "actions",
					value: actions - 1,
				}),
			);

			dispatch(
				resetBoardAbilities({
					boardId,
					limitTypes: ["turn"],
				}),
			);
			return;
		}
		dispatch(startNewTurn(boardId));
		dispatch(giveUpkeepResourceToBoard(boardId));
	};
