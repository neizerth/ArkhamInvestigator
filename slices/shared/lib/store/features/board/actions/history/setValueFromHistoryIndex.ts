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

		const { history } = board;

		const items = historyIndex === -1 ? [] : history.slice(0, historyIndex + 1);
		const lastItem = history[historyIndex];

		const usedAbilities = lastItem?.usedAbilities || [];
		const abilityValues = lastItem?.abilityValues;

		const valuePatches = items.map(prop("value"));
		const basePatches = items.map(prop("baseValue"));
		const initialPatches = items.map(prop("initialValue"));

		const valuePatch: Patch = Object.assign({}, ...valuePatches);
		const basePatch: Patch = Object.assign({}, ...basePatches);
		const initialPatch: Patch = Object.assign({}, ...initialPatches);

		const initialValue: InvestigatorBoardValues = {
			...board.initialValue,
			...initialPatch,
		};

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
			initialValue,
			value,
			baseValue,
			historyIndex,
			usedAbilities,
			abilityValues,
		};

		dispatch(setBoard(data));
	};
