import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import { TIMING_RULES_ID } from "../../../../../config";
import { selectRules } from "../rules";

export const selectTimingRules = createSelector([selectRules], (rules) => {
	return rules?.find(whereId(TIMING_RULES_ID))?.rules?.[0];
});
