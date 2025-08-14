import { createSelector } from "@reduxjs/toolkit";
import { inc } from "ramda";
import { selectTimingWizardStepIndex } from "../../../roundTiming";

export const selectNextTimingWizardStepIndex = createSelector(
	[selectTimingWizardStepIndex],
	(stepIndex) => {
		if (typeof stepIndex !== "number") {
			return;
		}

		return inc(stepIndex);
	},
);
