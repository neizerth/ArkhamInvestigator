import type { RootState } from "@shared/model";
import { dec } from "ramda";
import { selectTimingWizardStepIndex } from "../../../rules";

export const selectPrevTimingWizardStepIndex = (state: RootState) => {
	const stepIndex = selectTimingWizardStepIndex(state);
	if (typeof stepIndex !== "number") {
		return;
	}
	return dec(stepIndex);
};
