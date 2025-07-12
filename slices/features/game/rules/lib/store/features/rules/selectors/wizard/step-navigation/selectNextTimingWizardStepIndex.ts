import { createSelector } from "@reduxjs/toolkit";
import { selectTimingWizardStepIndex } from "../../../rules";

export const selectNextTimingWizardStepIndex = createSelector(
	[selectTimingWizardStepIndex],
	(stepIndex) => {
		if (typeof stepIndex !== "number") {
			return;
		}

		const nextIndex = stepIndex + 1;
		return nextIndex;
	},
);
