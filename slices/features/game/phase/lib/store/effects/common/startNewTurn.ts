import {
	resetBoardAbilities,
	selectHasAdditionalAction,
} from "@modules/board/abilities/shared/lib";
import { setAdditionalActionUse } from "@modules/board/abilities/shared/lib";
import {
	isBoardExists,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import type { AppThunk } from "@shared/model";
import { TURN_ABILITY_LIMITS } from "../../../../../../../shared/config";

export const startNewTurn =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}

		const { baseValue } = board;
		const additionalAction = selectHasAdditionalAction(boardId)(state);

		const historyGroup = createBoardHistoryGroup();

		dispatch(
			resetBoardAbilities({
				boardId,
				limitTypes: TURN_ABILITY_LIMITS,
				history: historyGroup,
			}),
		);

		if (additionalAction) {
			dispatch(
				setBoardActualPropValue({
					boardId,
					prop: "actions",
					value: baseValue.actions,
					history: historyGroup,
				}),
			);

			dispatch(
				setAdditionalActionUse({
					use: false,
					boardId,
					history: historyGroup,
				}),
			);
			return;
		}

		dispatch(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: baseValue.actions,
				history: historyGroup,
			}),
		);
	};
