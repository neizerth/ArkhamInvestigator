import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { InvestigatorBoard } from "@shared/model";
import { mergeBoardStats } from "../../../../../features";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setBoard } from "./setBoard";

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

		dispatch(setBoard(data));
	};
