import type { AppThunk } from "@shared/model";
import type { TimingPhaseId } from "../../../../../../model";
import {
	setTimingWizardActive,
	setTimingWizardPhaseId,
	setTimingWizardStepIndex,
} from "../../rules";

export const startTimingWizard =
	(id: TimingPhaseId, stepIndex = 0): AppThunk =>
	(dispatch) => {
		dispatch(setTimingWizardPhaseId(id));
		dispatch(setTimingWizardStepIndex(stepIndex));
		dispatch(setTimingWizardActive(true));
	};
