import type { AppThunk } from "@shared/model";

import {
	selectBoardActualPropValue,
	selectClues,
	selectSyncScenarioClues,
	setClues,
	withCurrentPayload,
} from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { spendClues } from "../features";

type Payload = PropsWithBoardId & {
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

		const investigatorClues = selectBoardActualPropValue({
			boardId,
			prop: "clues",
		})(state);

		if (typeof investigatorClues !== "number") {
			return;
		}

		const updatedClues = Math.max(investigatorClues - diff, 0);

		const spendCluesValue = investigatorClues - updatedClues;

		dispatch(
			spendClues({
				boardId,
				value: spendCluesValue,
			}),
		);
	};

export const setCurrentScenarioClues = withCurrentPayload(setScenarioClues);
