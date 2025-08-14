import { roundReferenceColor } from "../../../../../base/shared/config";
import type { TimingPhaseStepType } from "../../../model";

export const getPhaseStepColor = (type: TimingPhaseStepType) => {
	if (type === "end") {
		return;
	}

	return roundReferenceColor[type];
};
