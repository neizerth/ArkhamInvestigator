import {
	isBoardExists,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import type { AppThunk } from "@shared/model";

export const giveUpkeepResourceToBoard =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		if (!isBoardExists(board)) {
			return;
		}

		const { value, baseValue, investigator } = board;
		const { upkeepResourcesIncrease } = baseValue;

		if (!upkeepResourcesIncrease) {
			return;
		}

		const { name } = investigator;

		const resources = value.resources + upkeepResourcesIncrease;

		dispatch(
			setBoardActualPropValue({
				boardId,
				prop: "resources",
				value: resources,
			}),
		);

		dispatch(
			sendInvestigatorNotification({
				boardId,
				message: "investigator.getResources",
				data: {
					name,
					count: upkeepResourcesIncrease,
				},
			}),
		);
	};
