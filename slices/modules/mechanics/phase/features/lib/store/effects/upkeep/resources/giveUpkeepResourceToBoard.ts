import { getResources } from "@modules/board/base/entities/base/lib";
import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";

export const giveUpkeepResourceToBoard =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		if (!isBoardExists(board)) {
			return;
		}

		const { baseValue } = board;
		const { upkeepResourcesIncrease } = baseValue;

		if (!upkeepResourcesIncrease) {
			return;
		}

		dispatch(
			getResources({
				boardId,
				count: upkeepResourcesIncrease,
			}),
		);
	};
