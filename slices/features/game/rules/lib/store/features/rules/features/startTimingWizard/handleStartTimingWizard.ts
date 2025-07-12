import type { RulesHandler, TimingPhaseId } from "../../../../../../model";

export type HandleStartTimingWizardPayload = {
	phaseId: TimingPhaseId;
	stepIndex?: number;
};

export const handleStartTimingWizard: RulesHandler<
	HandleStartTimingWizardPayload
> = (state, { phaseId, stepIndex = 0 }: HandleStartTimingWizardPayload) => {
	state.timingWizardPhaseId = phaseId;
	state.timingWizardStepIndex = stepIndex;
};
