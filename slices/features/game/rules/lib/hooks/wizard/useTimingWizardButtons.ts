import { useAppSelector } from "@shared/lib";
import { useAppTranslation } from "../../../../../i18n";
import {
	selectNextTimingWizardStep,
	selectPrevTimingWizardStep,
	selectTimingWizardStep,
} from "../../store";
import { usePhaseStepName } from "../usePhaseStepName";

export const useTimingWizardButtons = () => {
	const { t } = useAppTranslation();

	const step = useAppSelector(selectTimingWizardStep);
	const prevStep = useAppSelector(selectPrevTimingWizardStep);
	const nextStep = useAppSelector(selectNextTimingWizardStep);

	const prevName = usePhaseStepName(prevStep);
	const nextName = usePhaseStepName(nextStep);

	const isStart = !step?.index;
	const isEnd = nextStep?.type === "end";

	const cancelText = isStart ? t`Close` : prevName;
	const cancelIcon = isStart ? "dismiss" : "left-arrow";
	const okIcon = isEnd ? "check" : "right-arrow";
	const okText = isEnd ? t`Phase end` : nextName;

	return {
		cancelIcon,
		cancelText,
		okIcon,
		okText,
	};
};
