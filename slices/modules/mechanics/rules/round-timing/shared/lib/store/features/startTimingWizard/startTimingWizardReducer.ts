import type { RoundTimingReducer } from "../../../../model";
import {
	type HandleStartTimingWizardPayload,
	handleStartTimingWizard,
} from "./handleStartTimingWizard";

export const startTimingWizardReducer: RoundTimingReducer<
	HandleStartTimingWizardPayload
> = (state, { payload }) => {
	handleStartTimingWizard(state, payload);
};
