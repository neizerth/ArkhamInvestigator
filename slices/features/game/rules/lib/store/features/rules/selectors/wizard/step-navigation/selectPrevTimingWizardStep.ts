import { createSelector } from "@reduxjs/toolkit";
import { selectTimingWizardPhase } from "../selectTimingWizardPhase";
import { selectPrevTimingWizardStepIndex } from "./selectPrevTimingWizardStepIndex";

export const selectPrevTimingWizardStep = createSelector(
	[selectTimingWizardPhase, selectPrevTimingWizardStepIndex],
	(phase, prevIndex) => {
		if (!phase || typeof prevIndex !== "number") {
			return;
		}
		return phase.steps[prevIndex];
	},
);
