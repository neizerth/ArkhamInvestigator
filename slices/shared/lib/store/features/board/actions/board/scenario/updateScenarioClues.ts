import type { AppThunk } from "@shared/model";
import { selectClues, selectSyncScenarioClues, setClues } from "../../../board";
import { selectCurrentStatValue } from "../../../selectors";
import { setCurrentStat } from "../../stats/current/setCurrentStat";

export const updateScenarioClues =
	(value: number): AppThunk =>
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

		const investigatorClues = selectCurrentStatValue("clues")(state);

		const updatedClues = Math.max(investigatorClues - diff, 0);

		dispatch(setCurrentStat("clues", updatedClues));
	};
