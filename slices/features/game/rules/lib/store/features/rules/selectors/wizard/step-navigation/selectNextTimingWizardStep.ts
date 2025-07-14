import type { RootState } from "@shared/model";
import { getTimingWizardStep } from "../../../getters";
import { selectCurrentTimingWizardPhase } from "../current/selectCurrentTimingWizardPhase";
import { selectNextTimingWizardStepIndex } from "./selectNextTimingWizardStepIndex";

export const selectNextTimingWizardStep = (state: RootState) => {
	const phase = selectCurrentTimingWizardPhase(state);
	const index = selectNextTimingWizardStepIndex(state);

	if (!phase || typeof index !== "number") {
		return;
	}
	return getTimingWizardStep({
		index,
		phase,
	});
};
