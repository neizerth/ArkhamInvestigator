import type { RootState } from "@shared/model";
import { getTimingWizardStep } from "../../../getters";
import { selectTimingWizardStepIndex } from "../../../rules";
import { selectCurrentTimingWizardPhase } from "./selectCurrentTimingWizardPhase";

export const selectCurrentTimingWizardStep = (state: RootState) => {
	const phase = selectCurrentTimingWizardPhase(state);
	const index = selectTimingWizardStepIndex(state);

	if (!phase || typeof index !== "number") {
		return;
	}
	return getTimingWizardStep({
		index,
		phase,
	});
};
