import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardStep } from "../../../getters";
import { selectTimingWizardStepIndex } from "../../../rules";
import { selectCurrentTimingWizardPhase } from "./selectCurrentTimingWizardPhase";

export const selectCurrentTimingWizardStep = createSelector(
	[selectCurrentTimingWizardPhase, selectTimingWizardStepIndex],
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
