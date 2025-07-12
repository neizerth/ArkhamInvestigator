import type { AppThunk } from "@shared/model";
import { setTimingWizardStepIndex } from "../../rules";
import {
	selectCurrentTimingWizardPhase,
	selectNextTimingWizardStep,
} from "../../selectors";

export const goToNextTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const phase = selectCurrentTimingWizardPhase(state);
		const nextStep = selectNextTimingWizardStep(state);

		if (!phase || !nextStep) {
			return;
		}

		if (nextStep.type === "end") {
			return;
		}

		dispatch(setTimingWizardStepIndex(nextStep.index));
	};
