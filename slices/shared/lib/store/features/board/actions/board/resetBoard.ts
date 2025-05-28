import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import {
	DEFAULT_HAND_SIZE,
	NEW_TURN_ACTIONS_COUNT,
	START_GAME_RESOURCES_COUNT,
} from "../../../../../../config";
import { setShowDescription } from "../../../game/game";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { clearHistory } from "../history/clearHistory";
import { setBoard } from "./setBoard";

import type { InvestigatorBoard } from "@shared/model";
import { selectInvestigatorSettingsByCode } from "../../../investigators/selectors/settings/selectInvestigatorSettingsByCode";

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
		};

		const value = {
			...baseValue,
			clues: 0,
			resources: START_GAME_RESOURCES_COUNT,
			actions: NEW_TURN_ACTIONS_COUNT,
			handSize: DEFAULT_HAND_SIZE,
			health: Math.max(0, initialValue.health - physicalTrauma),
			sanity: Math.max(0, initialValue.sanity - mentalTrauma),
		};

		const data: InvestigatorBoard = {
			...board,
			baseValue,
			value,
		};

		// dispatch()
		dispatch(setBoard(data));
		dispatch(clearHistory());
		dispatch(setShowDescription(false));
	};
