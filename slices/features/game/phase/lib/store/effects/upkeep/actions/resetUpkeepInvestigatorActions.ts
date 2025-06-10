import { selectBoardById } from "@shared/lib";
import type { AppThunk, BoardId } from "@shared/model";
import i18next from "i18next";
import { showToast } from "../../../../../../../notifications/lib";
import { startNewTurn } from "../../common";

export const resetUpkeepInvestigatorActions =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		dispatch(startNewTurn(boardId));

		const { name } = board.investigator;
		const message = i18next.t("upkeep.investigator.actionsReset", {
			name,
		});

		dispatch(showToast(message));
	};
