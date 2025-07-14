import type { RootState } from "@shared/model";
import { inc } from "ramda";
import { selectTimingWizardStepIndex } from "../../../rules";

export const selectNextTimingWizardStepIndex = (state: RootState) => {
	const stepIndex = selectTimingWizardStepIndex(state);
	if (typeof stepIndex !== "number") {
		return;
	}
	return inc(stepIndex);
};
