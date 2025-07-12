import type { AppThunk } from "@shared/model";
import { setTimingWizardStepIndex } from "../../rules";
import {
	selectCurrentTimingWizardPhase,
	selectPrevTimingWizardStep,
} from "../../selectors";

export const goToPrevTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const phase = selectCurrentTimingWizardPhase(state);
		const prevStep = selectPrevTimingWizardStep(state);

		if (!phase || !prevStep) {
			return;
		}

		dispatch(setTimingWizardStepIndex(prevStep.index));
	};
