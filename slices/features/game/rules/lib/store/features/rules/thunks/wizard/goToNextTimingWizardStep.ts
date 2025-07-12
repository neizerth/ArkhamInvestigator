import type { AppThunk } from "@shared/model";
import { setTimingWizardActive, setTimingWizardStepIndex } from "../../rules";
import {
	selectNextTimingWizardStep,
	selectTimingWizardPhase,
} from "../../selectors";

export const goToNextTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const phase = selectTimingWizardPhase(state);
		const nextStep = selectNextTimingWizardStep(state);

		if (!phase || !nextStep) {
			return;
		}

		if (nextStep.type === "end") {
			return;
		}

		dispatch(setTimingWizardStepIndex(nextStep.index));
		dispatch(setTimingWizardActive(true));
	};
