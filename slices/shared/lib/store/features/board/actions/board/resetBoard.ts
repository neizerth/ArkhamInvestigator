import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import {
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "../../../../../../config";
import { setShowDescription } from "../../../game/game";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { clearHistory } from "../history/clearHistory";
import { setCurrentBoard } from "./setCurrentBoard";

import type { InvestigatorBoard } from "@shared/model";
import { selectInvestigatorSettingsByCode } from "../../../investigators/selectors/selectInvestigatorSettingsByCode";

export const resetBoard: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();

		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const { initialValue } = board;

		const { physicalTrauma = 0, mentalTrauma = 0 } =
			selectInvestigatorSettingsByCode(board.signatureGroupId)(state);

		const baseValue = {
			...initialValue,
			health: Math.max(0, initialValue.health - physicalTrauma),
			sanity: Math.max(0, initialValue.sanity - mentalTrauma),
		};

		const data: InvestigatorBoard = {
			...board,
			baseValue,
			value: {
				...baseValue,
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
