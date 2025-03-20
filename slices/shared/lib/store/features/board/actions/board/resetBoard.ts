import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/lib/store";
import {
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "../../../../../../config";
import { setShowDescription } from "../../../game/game";
import { selectCurrentBoard } from "../../selectors/selectCurrentBoard";
import { clearHistory } from "../history/clearHistory";
import { setCurrentBoard } from "./setCurrentBoard";

import type { InvestigatorBoard } from "@shared/model";

export const resetBoard: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const data: InvestigatorBoard = {
			...board,
			baseValue: board.initialValue,
			value: {
				...board.initialValue,
				clues: 0,
				resources: START_GAME_RESOURCES_COUNT,
				actions: NEW_TURN_ACTIONS_COUNT,
			},
		};

		// dispatch()
		dispatch(setCurrentBoard(data));
		dispatch(clearHistory());
		dispatch(setShowDescription(false));
	};
