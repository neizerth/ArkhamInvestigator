import { useTranslation } from "react-i18next";
import type { TimingPhaseStep } from "../../model";

export const usePhaseStepName = (step?: TimingPhaseStep) => {
	const { t } = useTranslation();

	if (!step) {
		return "";
	}

	if (step.type !== "step") {
		return t(step.name);
	}

	return t("timing.step.name", {
		name: step.name,
	});
};
