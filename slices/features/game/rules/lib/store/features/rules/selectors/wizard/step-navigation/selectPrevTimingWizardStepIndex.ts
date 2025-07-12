import { createSelector } from "@reduxjs/toolkit";
import { getPrevTimingWizardStepIndex } from "../../../getters";
import { selectTimingWizardStepIndex } from "../../../rules";

export const selectPrevTimingWizardStepIndex = createSelector(
	[selectTimingWizardStepIndex],
	(stepIndex) => {
		if (typeof stepIndex !== "number") {
			return;
		}

		return getPrevTimingWizardStepIndex(stepIndex);
	},
);
