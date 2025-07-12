import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardPhase } from "../../getters";
import { selectTimingWizardPhaseId } from "../../rules";
import { selectRoundPhases } from "../selectRoundPhases";

export const selectTimingWizardPhase = createSelector(
	[selectTimingWizardPhaseId, selectRoundPhases],
	(phaseId, phases) =>
		phaseId &&
		getTimingWizardPhase({
			phaseId,
			phases,
		}),
);
