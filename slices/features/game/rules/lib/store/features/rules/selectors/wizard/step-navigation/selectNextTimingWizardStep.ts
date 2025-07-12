import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardStep } from "../../../getters";
import { selectCurrentTimingWizardPhase } from "../current/selectCurrentTimingWizardPhase";
import { selectNextTimingWizardStepIndex } from "./selectNextTimingWizardStepIndex";

export const selectNextTimingWizardStep = createSelector(
	[selectCurrentTimingWizardPhase, selectNextTimingWizardStepIndex],
	(phase, index) => {
		if (!phase || typeof index !== "number") {
			return;
		}
		return getTimingWizardStep({
			index,
			phase,
		});
	},
);
