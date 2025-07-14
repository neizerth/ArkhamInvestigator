import type { RootState } from "@shared/model";
import { getTimingWizardStep } from "../../getters";
import { selectCurrentTimingWizardPhase } from "./current/selectCurrentTimingWizardPhase";

export const selectTimingWizardStep = (index: number) => (state: RootState) => {
	const phase = selectCurrentTimingWizardPhase(state);
	if (!phase) {
		return;
	}
	return getTimingWizardStep({
		index,
		phase,
	});
};
