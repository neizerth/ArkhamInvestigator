import { useAppTranslation } from "../../../../../modules/i18n/shared/lib/hooks";
import type { TimingPhaseStep } from "../../model";

export const usePhaseStepName = (step?: TimingPhaseStep) => {
	const { t } = useAppTranslation();

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
