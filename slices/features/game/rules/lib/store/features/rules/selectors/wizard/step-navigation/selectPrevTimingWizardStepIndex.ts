import { createSelector } from "@reduxjs/toolkit";
import { selectTimingWizardStepIndex } from "../../../rules";
import { selectTimingWizardPhase } from "../selectTimingWizardPhase";

export const selectPrevTimingWizardStepIndex = createSelector(
	[selectTimingWizardPhase, selectTimingWizardStepIndex],
	(phase, stepIndex) => {
		if (!phase || typeof stepIndex !== "number") {
			return;
		}

		if (stepIndex === 0) {
			return;
		}

		const nextIndex = stepIndex - 1;
		return nextIndex;
	},
);
