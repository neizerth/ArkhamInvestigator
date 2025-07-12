import type { AppThunk } from "@shared/model";
import { setTimingWizardActive, setTimingWizardStepIndex } from "../../rules";
import {
	selectPrevTimingWizardStep,
	selectTimingWizardPhase,
} from "../../selectors";

export const goToPrevTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const phase = selectTimingWizardPhase(state);
		const prevStep = selectPrevTimingWizardStep(state);

		if (!phase || !prevStep) {
			return;
		}

		dispatch(setTimingWizardStepIndex(prevStep.index));
		dispatch(setTimingWizardActive(true));
	};
