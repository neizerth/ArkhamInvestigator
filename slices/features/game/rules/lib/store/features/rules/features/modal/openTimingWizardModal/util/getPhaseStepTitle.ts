import type { BaseModalActionTitle } from "@modules/core/modal/shared/base/model";
import type { TimingPhaseStep } from "../../../../../../../../model";

export const getPhaseStepTitle = (
	step: TimingPhaseStep,
): BaseModalActionTitle => {
	const { type, name } = step;
	if (type === "step") {
		return {
			i18nKey: "timing.step.name",
			data: {
				name,
			},
		};
	}

	return name;
};
