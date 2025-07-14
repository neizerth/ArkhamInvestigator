import type { RootState } from "@shared/model";
import { getTimingWizardPhase } from "../../../getters";
import { selectTimingWizardPhaseId } from "../../../rules";
import { selectRoundPhases } from "../../selectRoundPhases";

export const selectCurrentTimingWizardPhase = (state: RootState) => {
	const phaseId = selectTimingWizardPhaseId(state);
	const phases = selectRoundPhases(state);

	if (!phaseId) {
		return;
	}

	return getTimingWizardPhase({
		phaseId,
		phases,
	});
};
