import type { TimingPhaseStep } from "@modules/mechanics/rules/round-timing/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { roundTimingPrefix } from "../../../../../shared/config";
export type ProcessTimingWizardStepPayload = {
	step: TimingPhaseStep;
};

export const processTimingWizardStep =
	createAction<ProcessTimingWizardStepPayload>(
		`${roundTimingPrefix}/processStep`,
	);
