import type { CustomModalAction } from "@modules/core/modal/shared/actions/custom/base/model";
import type { BaseModalData } from "@modules/core/modal/shared/base/model";
import type { TimingPhaseId, TimingPhaseStep } from "../../shared/model";

export type TimingWizardModalAction = CustomModalAction & {
	phaseId: TimingPhaseId;
	step?: TimingPhaseStep;
	prevStep?: TimingPhaseStep;
	nextStep?: TimingPhaseStep;
};

export type TimingWizardModalData = BaseModalData<TimingWizardModalAction>;
