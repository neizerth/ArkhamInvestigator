import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardStep } from "../../../getters";
import { selectCurrentTimingWizardPhase } from "../current/selectCurrentTimingWizardPhase";
import { selectPrevTimingWizardStepIndex } from "./selectPrevTimingWizardStepIndex";

export const selectPrevTimingWizardStep = createSelector(
	[selectCurrentTimingWizardPhase, selectPrevTimingWizardStepIndex],
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
