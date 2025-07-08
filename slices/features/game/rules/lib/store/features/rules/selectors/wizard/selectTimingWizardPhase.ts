import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import { selectTimingWizardPhaseId } from "../../rules";
import { selectRoundPhases } from "../selectRoundPhases";

export const selectTimingWizardPhase = createSelector(
	[selectTimingWizardPhaseId, selectRoundPhases],
	(id, phases) => id && phases.find(whereId(id)),
);
