import { createAction } from "@reduxjs/toolkit";
import { timingRulesPrefix } from "../../../../../../../config";
import type { TimingPhaseId } from "../../../../../../../model";

export type OpenTimingWizardModalPayload = {
	stepIndex: number;
	phaseId: TimingPhaseId;
};

export const openTimingWizardModal = createAction<OpenTimingWizardModalPayload>(
	`${timingRulesPrefix}/openModal`,
);
