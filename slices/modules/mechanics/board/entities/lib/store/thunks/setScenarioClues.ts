import type { AppThunk } from "@shared/model";

import {
	createCurrentActionCreator,
	selectBoardValue,
	selectClues,
	selectSyncScenarioClues,
	setClues,
} from "@modules/board/base/shared/lib";
import type { PropsWithBoard } from "@modules/board/base/shared/model";
import { spendClues } from "../features/spendClues/spendClues.thunk";

type Payload = PropsWithBoard & {
	value: number;
};

export const setScenarioClues =
	({ value, boardId }: Payload): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const syncEnabled = selectSyncScenarioClues(state);
		const clues = selectClues(state);

		dispatch(setClues(value));

		if (!syncEnabled) {
			return false;
		}

		const diff = value - clues;

		if (diff <= 0) {
			return;
		}

		const investigatorClues = selectBoardValue({
			boardId,
			prop: "clues",
		})(state);

		if (typeof investigatorClues !== "number") {
			return;
		}

		// const investigatorClues = selectCurrentStatValue("clues")(state);

		const updatedClues = Math.max(investigatorClues - diff, 0);

		const spendCluesValue = investigatorClues - updatedClues;

		dispatch(
			spendClues({
				boardId,
				value: spendCluesValue,
			}),
		);

		// dispatch(
		// 	setBoardActualPropValue({
		// 		boardId,
		// 		prop: "clues",
		// 		value: updatedClues,
		// 	}),
		// );
	};

export const setCurrentScenarioClues =
	createCurrentActionCreator(setScenarioClues);
