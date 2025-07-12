import { createAction } from "@reduxjs/toolkit";
import { timingRulesPrefix } from "../../../../../../../config";

export const goToNextTimingWizardStep = createAction(
	`${timingRulesPrefix}/nextStep`,
);
