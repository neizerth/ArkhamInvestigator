import { createSelector } from "@reduxjs/toolkit";
import { getTimingWizardPhase } from "../../../getters";
import { selectTimingWizardPhaseId } from "../../../roundTiming";
import { selectRoundPhases } from "../../selectRoundPhases";

export const selectCurrentTimingWizardPhase = createSelector(
	[selectTimingWizardPhaseId, selectRoundPhases],
	(phaseId, phases) =>
		phaseId &&
		getTimingWizardPhase({
			phaseId,
			phases,
		}),
);
