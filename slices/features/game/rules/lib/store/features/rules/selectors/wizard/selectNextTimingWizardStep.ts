import { createSelector } from "@reduxjs/toolkit";
import { selectNextTimingWizardStepIndex } from "./selectNextTimingWizardStepIndex";
import { selectTimingWizardPhase } from "./selectTimingWizardPhase";

export const selectNextTimingWizardStep = createSelector(
	[selectTimingWizardPhase, selectNextTimingWizardStepIndex],
	(phase, nextIndex) => {
		if (!phase || typeof nextIndex !== "number") {
			return;
		}
		return phase.steps[nextIndex];
	},
);
