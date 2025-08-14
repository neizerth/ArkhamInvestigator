import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardStep } from "../../getters";
import { selectCurrentTimingWizardPhase } from "./current/selectCurrentTimingWizardPhase";

export const selectTimingWizardStep = (index: number) =>
	createSelector([selectCurrentTimingWizardPhase], (phase) => {
		if (!phase) {
			return;
		}
		return getTimingWizardStep({
			index,
			phase,
		});
	});
