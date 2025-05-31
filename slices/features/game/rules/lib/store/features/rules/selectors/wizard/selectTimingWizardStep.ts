import { createSelector } from "@reduxjs/toolkit";
import { selectTimingWizardStepIndex } from "../../rules";
import { selectTimingWizardPhase } from "./selectTimingWizardPhase";

export const selectTimingWizardStep = createSelector(
	[selectTimingWizardPhase, selectTimingWizardStepIndex],
	(phase, index) => {
		if (!phase || typeof index !== "number") {
			return;
		}
		return phase.steps[index];
	},
);
