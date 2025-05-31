import type { AppThunk } from "@shared/model";
import type { TimingPhaseId } from "../../../../../../model";
import {
	setTimingWizardActive,
	setTimingWizardPhaseId,
	setTimingWizardStepIndex,
} from "../../rules";

export const startTimingWizard =
	(id: TimingPhaseId): AppThunk =>
	(dispatch) => {
		dispatch(setTimingWizardPhaseId(id));
		dispatch(setTimingWizardStepIndex(0));
		dispatch(setTimingWizardActive(true));
	};
