import { createSelector } from "@reduxjs/toolkit";
import { dec } from "ramda";
import { selectTimingWizardStepIndex } from "../../../rules";

export const selectPrevTimingWizardStepIndex = createSelector(
	[selectTimingWizardStepIndex],
	(stepIndex) => {
		if (typeof stepIndex !== "number") {
			return;
		}

		return dec(stepIndex);
	},
);
