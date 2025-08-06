import type { I18NText } from "@modules/core/i18n/shared/model";
import type { TimingPhaseStep } from "../../../../../../../../model";

export const getPhaseStepTitle = (step: TimingPhaseStep): I18NText => {
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
