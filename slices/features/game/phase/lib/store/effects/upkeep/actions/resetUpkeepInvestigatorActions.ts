import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { AppThunk } from "@shared/model";
import i18next from "i18next";
import { showToast } from "../../../../../../../notifications/lib";
import { startNewTurn } from "../../common";

export const resetUpkeepInvestigatorActions =
	(boardId: BoardId = "current"): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);

		if (!isBoardExists(board)) {
			return;
		}
		dispatch(startNewTurn(boardId));

		const { name } = board.investigator;
		const message = i18next.t("upkeep.investigator.actionsReset", {
			name,
		});

		dispatch(showToast(message));
	};
