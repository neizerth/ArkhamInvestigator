import {
	selectDoom,
	selectInvestigatorBoards,
	setDoom,
	startNewTurn,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { i18next } from "../../../../../../../../i18n/config";
import { showToast } from "../../../../../../../../notifications/lib/store/effects/showToast";
import { giveUpkeepResourcesToAllBoards } from "../../../../../../../phase";
import { selectTimingWizardStep } from "../../selectors";

export const processCurrentTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const step = selectTimingWizardStep(state);

		if (!step) {
			return;
		}

		if (step.specialType === "mythos-doom") {
			const currentDoom = selectDoom(state);
			const doom = currentDoom + 1;
			dispatch(setDoom(currentDoom));

			const message = i18next.t("mythos.doom", {
				doom,
			});
			dispatch(showToast(message, 3000));
			return;
		}

		if (step.specialType === "upkeep-resource") {
			dispatch(giveUpkeepResourcesToAllBoards());
			return;
		}

		if (step.specialType === "reset-actions") {
			const boards = selectInvestigatorBoards(state);
			for (const board of boards) {
				dispatch(startNewTurn(board.id));

				const { name } = board.investigator;
				const message = i18next.t("upkeep.investigator.actionsReset", {
					name,
				});

				dispatch(showToast(message));
			}
			return;
		}
	};
