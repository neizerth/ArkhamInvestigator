import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardStep } from "../../../getters";
import { selectTimingWizardPhase } from "../selectTimingWizardPhase";
import { selectPrevTimingWizardStepIndex } from "./selectPrevTimingWizardStepIndex";

export const selectPrevTimingWizardStep = createSelector(
	[selectTimingWizardPhase, selectPrevTimingWizardStepIndex],
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
