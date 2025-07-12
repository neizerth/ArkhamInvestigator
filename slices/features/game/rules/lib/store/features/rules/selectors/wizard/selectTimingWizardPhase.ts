import { createSelector } from "@reduxjs/toolkit";
import type { TimingPhaseId } from "../../../../../../model";
import { getTimingWizardPhase } from "../../getters";
import { selectRoundPhases } from "../selectRoundPhases";

export const selectTimingWizardPhase = (phaseId: TimingPhaseId) =>
	createSelector([selectRoundPhases], (phases) =>
		getTimingWizardPhase({
			phaseId,
			phases,
		}),
	);
