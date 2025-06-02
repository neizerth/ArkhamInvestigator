import type { AppThunk } from "@shared/model";
import { i18next } from "../../../../../../../../features/i18n/config";
import { showToast } from "../../../../../../../../features/notifications";
import { selectClues, selectSyncScenarioClues, setClues } from "../../../board";
import {
	selectCurrentBoardProp,
	selectCurrentStatValue,
} from "../../../selectors";
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

		const { name } = selectCurrentBoardProp("investigator")(state);
		const spent = investigatorClues - updatedClues;
		const remains = investigatorClues - spent;

		const message = i18next.t("clues.spent", {
			name,
			count: spent,
		});

		const remainsMessage = i18next.t("clues.remains", {
			count: remains,
		});

		dispatch(showToast(`${message}\n${remainsMessage}`));
	};
