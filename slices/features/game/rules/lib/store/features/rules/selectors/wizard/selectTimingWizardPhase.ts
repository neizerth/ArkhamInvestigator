import type { RootState } from "@shared/model";
import type { TimingPhaseId } from "../../../../../../model";
import { getTimingWizardPhase } from "../../getters";
import { selectRoundPhases } from "../selectRoundPhases";

export const selectTimingWizardPhase =
	(phaseId: TimingPhaseId) => (state: RootState) => {
		const phases = selectRoundPhases(state);
		return getTimingWizardPhase({
			phaseId,
			phases,
		});
	};
