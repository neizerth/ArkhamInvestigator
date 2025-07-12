import { createAction } from "@reduxjs/toolkit";
import { timingRulesPrefix } from "../../../../../../../config";

export const openTimingWizardStep = createAction(
	`${timingRulesPrefix}/openStepModal`,
);
