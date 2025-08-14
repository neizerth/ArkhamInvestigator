import { roundTimingPrefix } from "@modules/mechanics/rules/round-timing/shared/config";
import type { TimingPhaseId } from "@modules/mechanics/rules/round-timing/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type OpenTimingWizardModalPayload = {
	stepIndex: number;
	phaseId: TimingPhaseId;
};

export const openTimingWizardModal = createAction<OpenTimingWizardModalPayload>(
	`${roundTimingPrefix}/openModal`,
);
