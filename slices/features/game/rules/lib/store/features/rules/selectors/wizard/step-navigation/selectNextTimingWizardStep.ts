import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardStep } from "../../../getters";
import { selectTimingWizardPhase } from "../selectTimingWizardPhase";
import { selectNextTimingWizardStepIndex } from "./selectNextTimingWizardStepIndex";

export const selectNextTimingWizardStep = createSelector(
	[selectTimingWizardPhase, selectNextTimingWizardStepIndex],
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
