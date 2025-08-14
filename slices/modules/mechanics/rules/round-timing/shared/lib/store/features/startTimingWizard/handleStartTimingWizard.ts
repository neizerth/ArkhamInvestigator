import type { RoundTimingHandler, TimingPhaseId } from "../../../../model";

export type HandleStartTimingWizardPayload = {
	phaseId: TimingPhaseId;
	stepIndex?: number;
};

export const handleStartTimingWizard: RoundTimingHandler<
	HandleStartTimingWizardPayload
> = (state, { phaseId, stepIndex = 0 }: HandleStartTimingWizardPayload) => {
	state.timingWizardPhaseId = phaseId;
	state.timingWizardStepIndex = stepIndex;
};
