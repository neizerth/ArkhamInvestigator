import {
	isBoardExists,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import i18next from "i18next";
import { showToast } from "../../../../../../../notifications/lib";

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

		const message = i18next.t("upkeep.investigator.getResources", {
			name,
			count: upkeepResourcesIncrease,
		});

		dispatch(showToast(message));
	};
