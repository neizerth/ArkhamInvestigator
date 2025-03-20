import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import { propEq, reject } from "ramda";

import { selectCurrentBoard, setCurrentBoard } from "../../board";
import { selectSkillCheckType, sendCommandSignal } from "../skillCheck";

export const clearSkillCheckHistory: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		const type = selectSkillCheckType(state);

		if (!board || !type) {
			return;
		}

		const checkHistory = reject(propEq(type, "type"), board.checkHistory);

		dispatch(
			setCurrentBoard({
				...board,
				checkHistory,
			}),
		);
		dispatch(sendCommandSignal("clear"));
	};
