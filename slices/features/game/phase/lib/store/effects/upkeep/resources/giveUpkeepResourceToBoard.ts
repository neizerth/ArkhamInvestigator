import { selectBoardById, setBoard } from "@shared/lib";
import type { AppThunk, BoardId } from "@shared/model";
import i18next from "i18next";
import { showToast } from "../../../../../../../notifications/lib";

export const giveUpkeepResourceToBoard =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		if (!board) {
			return;
		}

		const { value, baseValue, investigator } = board;
		const { upkeepResourcesIncrease } = baseValue;

		if (!upkeepResourcesIncrease) {
			return;
		}

		const { name } = investigator;

		const resources = value.resources + upkeepResourcesIncrease;

		const data = {
			...board,
			value: {
				...value,
				resources,
			},
		};

		dispatch(setBoard(data, boardId));

		const message = i18next.t("upkeep.investigator.getResources", {
			name,
			count: upkeepResourcesIncrease,
		});

		dispatch(showToast(message));
	};
