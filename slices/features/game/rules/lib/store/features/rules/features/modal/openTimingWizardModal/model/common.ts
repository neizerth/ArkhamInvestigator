import type { CustomModalAction } from "@modules/core/modal/shared/actions/custom/base/model";
import type { BaseModalData } from "@modules/core/modal/shared/base/model";
import type { TimingPhaseStep } from "../../../../../../../../model";

export type TimingWizardModalAction = CustomModalAction & {
	step?: TimingPhaseStep;
};

export type TimingWizardModalData = BaseModalData<TimingWizardModalAction>;
