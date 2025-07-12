import { createAction } from "@reduxjs/toolkit";
import { timingRulesPrefix } from "../../../../../../../config";

export const goToPrevTimingWizardStep = createAction(
	`${timingRulesPrefix}/prevStep`,
);
