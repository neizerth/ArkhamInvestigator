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
import type { AppThunk } from "@shared/model";
import { v4 } from "uuid";
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

		dispatch(
			resetBoardAbilities({
				boardId,
				limitTypes: TURN_ABILITY_LIMITS,
			}),
		);

		if (additionalAction) {
			const historyId = v4();

			dispatch(
				setBoardActualPropValue({
					boardId,
					prop: "actions",
					value: baseValue.actions,
					history: {
						type: "group",
						id: historyId,
					},
				}),
			);

			dispatch(
				setAdditionalActionUse({
					use: false,
					boardId,
					history: {
						type: "group",
						id: historyId,
					},
				}),
			);
			return;
		}

		dispatch(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: baseValue.actions,
			}),
		);
	};
