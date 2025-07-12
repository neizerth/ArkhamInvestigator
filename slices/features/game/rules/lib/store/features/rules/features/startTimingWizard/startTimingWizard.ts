import type { RulesReducer } from "../../../../../../model";
import {
	type HandleStartTimingWizardPayload,
	handleStartTimingWizard,
} from "./handleStartTimingWizard";

export const startTimingWizard: RulesReducer<HandleStartTimingWizardPayload> = (
	state,
	{ payload },
) => {
	handleStartTimingWizard(state, payload);
};
