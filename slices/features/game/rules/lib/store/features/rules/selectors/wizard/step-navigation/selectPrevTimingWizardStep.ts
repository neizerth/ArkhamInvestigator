import type { RootState } from "@shared/model";
import { getTimingWizardStep } from "../../../getters";
import { selectCurrentTimingWizardPhase } from "../current/selectCurrentTimingWizardPhase";
import { selectPrevTimingWizardStepIndex } from "./selectPrevTimingWizardStepIndex";

export const selectPrevTimingWizardStep = (state: RootState) => {
	const phase = selectCurrentTimingWizardPhase(state);
	const index = selectPrevTimingWizardStepIndex(state);

	if (!phase || typeof index !== "number") {
		return;
	}
	return getTimingWizardStep({
		index,
		phase,
	});
};
