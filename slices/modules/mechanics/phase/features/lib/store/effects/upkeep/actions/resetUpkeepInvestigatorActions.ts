import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import type { AppThunk } from "@shared/model";
import { startNewTurn } from "../../../features";

export const resetUpkeepInvestigatorActions =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}
		dispatch(startNewTurn({ boardId }));

		const { name } = board.investigator;
		dispatch(
			sendNotification({
				message: "upkeep.investigator.actionsReset",
				data: {
					name,
				},
			}),
		);
	};
