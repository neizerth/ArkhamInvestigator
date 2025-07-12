import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { replaceBoard } from "@modules/mechanics/board/base/entities/lib";
import type { ActionCreator } from "@reduxjs/toolkit";
import {
	goBack,
	setReplaceInvestigator,
	setSelectedInvestigators,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { selectGameInvestigatorBoards } from "../selectors";

export const replaceInvestigator: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();
		const [board] = selectGameInvestigatorBoards(state);
		const currentBoard = selectCurrentBoard(state);

		if (!currentBoard) {
			return;
		}

		dispatch(
			replaceBoard({
				boardId: "current",
				board,
			}),
		);

		dispatch(setReplaceInvestigator(false));
		dispatch(setSelectedInvestigators([]));
		dispatch(goBack());
	};
