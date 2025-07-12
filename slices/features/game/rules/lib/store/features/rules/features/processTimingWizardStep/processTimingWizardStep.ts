import { createAction } from "@reduxjs/toolkit";
import { timingRulesPrefix } from "../../../../../../config";
import type { TimingPhaseStep } from "../../../../../../model";

export type ProcessTimingWizardStepPayload = {
	step: TimingPhaseStep;
};

export const processTimingWizardStep =
	createAction<ProcessTimingWizardStepPayload>(
		`${timingRulesPrefix}/processStep`,
	);
