import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { SkillCheckHistoryItem } from "@shared/model";
import { v4 } from "uuid";
import { getSkillCheckValue } from "../../../../../features";
import {
	selectSkillCheckData,
	selectSkillCheckType,
	sendCommandSignal,
	sendNumberSignal,
} from "../../../skillCheck/skillCheck";
import { selectCurrentBoard } from "../../selectors";
import { setCurrentBoard } from "../board/setCurrentBoard";

export const addCurrentSkillCheckToHistory: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();
		const type = selectSkillCheckType(state);
		const expression = selectSkillCheckData(state);
		const board = selectCurrentBoard(state);

		if (!type || !board) {
			return;
		}

		const value = getSkillCheckValue({
			data: expression,
			value: board.value,
		});

		const item: SkillCheckHistoryItem = {
			id: v4(),
			type,
			expression,
			value,
		};

		const checkHistory = [...board.checkHistory, item];

		dispatch(
			setCurrentBoard({
				...board,
				checkHistory,
			}),
		);

		dispatch(sendCommandSignal("clear"));
		dispatch(
			sendNumberSignal({
				value,
				removable: true,
			}),
		);
	};
