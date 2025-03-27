import type { ActionCreator } from "@reduxjs/toolkit";
import { mergeBoardStats } from "@shared/lib/features";
import type { AppThunk } from "@shared/lib/store";
import type { InvestigatorBoard } from "@shared/model";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setCurrentBoard } from "./setCurrentBoard";

export const replaceCurrentBoard: ActionCreator<AppThunk> =
	(board: InvestigatorBoard) => (dispatch, getState) => {
		const state = getState();
		const currentBoard = selectCurrentBoard(state);

		if (!currentBoard) {
			return;
		}

		const value = mergeBoardStats(currentBoard, board.baseValue);

		const data = {
			...board,
			value,
		};

		dispatch(setCurrentBoard(data));
	};
