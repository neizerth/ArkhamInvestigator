import type { AppThunkCreator } from "@shared/lib/store";
import type {
	HistoryItem,
	InvestigatorBoard,
	InvestigatorBoardValues,
} from "@shared/model";

import { prop, propEq } from "ramda";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setCurrentBoard } from "../board/setCurrentBoard";

type Patch = Partial<InvestigatorBoardValues>;

export const setValueFromHistoryIndex: AppThunkCreator =
	(historyIndex: number) => (dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);

		if (!board) {
			return;
		}

		const { history, initialValue } = board;

		const items = historyIndex === -1 ? [] : history.slice(0, historyIndex + 1);

		const valuePatches = items.map(prop("value"));
		const basePatches = items.map(prop("baseValue"));

		const valuePatch: Patch = Object.assign({}, ...valuePatches);
		const basePatch: Patch = Object.assign({}, ...basePatches);

		const value: InvestigatorBoardValues = {
			...initialValue,
			...valuePatch,
		};

		const baseValue: InvestigatorBoardValues = {
			...initialValue,
			...basePatch,
		};

		const data: InvestigatorBoard = {
			...board,
			value,
			baseValue,
			historyIndex,
		};

		dispatch(setCurrentBoard(data));
	};
