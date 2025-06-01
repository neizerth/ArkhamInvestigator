import { createSelector } from "@reduxjs/toolkit";
import { selectTimingWizardPhase } from "../selectTimingWizardPhase";
import { selectNextTimingWizardStepIndex } from "./selectNextTimingWizardStepIndex";

export const selectNextTimingWizardStep = createSelector(
	[selectTimingWizardPhase, selectNextTimingWizardStepIndex],
	(phase, nextIndex) => {
		if (!phase || typeof nextIndex !== "number") {
			return;
		}
		return phase.steps[nextIndex];
	},
);
