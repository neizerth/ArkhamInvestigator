import type { AppThunkCreator } from "@shared/model";
import type { InvestigatorBoard, InvestigatorBoardValues } from "@shared/model";

import { prop } from "ramda";
import { selectCurrentBoard } from "../../selectors/current/selectCurrentBoard";
import { setBoard } from "../board/setBoard";

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
		const lastItem = history[historyIndex];

		const usedAbilities = lastItem?.usedAbilities || [];

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
			usedAbilities,
		};

		dispatch(setBoard(data));
	};
