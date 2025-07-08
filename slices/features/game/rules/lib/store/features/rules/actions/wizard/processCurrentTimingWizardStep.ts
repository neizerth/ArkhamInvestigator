import type { AppThunk } from "@shared/model";
import {
	giveUpkeepResourcesToAllBoards,
	placeDoomOnAgenda,
	resetUpkeepAllInvestigatorActions,
} from "../../../../../../../phase";
import { selectTimingWizardStep } from "../../selectors";

export const processCurrentTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const step = selectTimingWizardStep(state);

		if (!step) {
			return;
		}

		if (step.specialType === "mythos-doom") {
			dispatch(placeDoomOnAgenda());
			return;
		}

		if (step.specialType === "upkeep-resource") {
			dispatch(giveUpkeepResourcesToAllBoards());
			return;
		}

		if (step.specialType === "reset-actions") {
			dispatch(resetUpkeepAllInvestigatorActions());
			return;
		}
	};
