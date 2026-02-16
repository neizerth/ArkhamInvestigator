import { createSelector } from "@reduxjs/toolkit";
import type { PropsWithFaction } from "@shared/model";
import { dec, inc } from "ramda";

import { selectCurrentFaction } from "@modules/mechanics/board/base/entities/lib";
import {
	selectTimingWizardPhase,
	selectTimingWizardStep,
} from "../../../../shared/lib";
import type { TimingPhase, TimingPhaseStep } from "../../../../shared/model";
import type { OpenTimingWizardModalPayload } from "../features/openTimingWizardModal/openTimingWizardModal";

export type TimingWizardModalSagaData = PropsWithFaction & {
	step: TimingPhaseStep;
	phase: TimingPhase;
	next?: TimingPhaseStep;
	prev?: TimingPhaseStep;
};

export const selectTimingWizardModalSagaData = (
	payload: OpenTimingWizardModalPayload,
) => {
	const { phaseId, stepIndex } = payload;
	const nextStepIndex = inc(stepIndex);
	const prevStepIndex = dec(stepIndex);

	return createSelector(
		[
			selectTimingWizardPhase(phaseId),
			selectTimingWizardStep(stepIndex),
			selectTimingWizardStep(nextStepIndex),
			selectTimingWizardStep(prevStepIndex),
			selectCurrentFaction,
		],
		(
			phase,
			step,
			nextStep,
			prevStep,
			faction,
		): TimingWizardModalSagaData | undefined => {
			if (!phase || !step) {
				return;
			}
			return {
				faction,
				step,
				phase,
				next: nextStep,
				prev: prevStep,
			};
		},
	);
};
