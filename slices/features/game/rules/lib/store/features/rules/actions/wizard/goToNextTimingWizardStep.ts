import type { AppThunk } from "@shared/model";
import { setTimingWizardActive, setTimingWizardStepIndex } from "../../rules";
import {
	selectNextTimingWizardStepIndex,
	selectTimingWizardPhase,
} from "../../selectors";

export const goToNextTimingWizardStep =
	(): AppThunk => (dispatch, getState) => {
		const state = getState();
		const phase = selectTimingWizardPhase(state);
		const nextIndex = selectNextTimingWizardStepIndex(state);

		if (!phase || typeof nextIndex !== "number") {
			return;
		}

		const nextStep = phase.steps[nextIndex];

		if (nextStep.type === "end") {
			return;
		}

		dispatch(setTimingWizardStepIndex(nextIndex));
		dispatch(setTimingWizardActive(true));
	};
