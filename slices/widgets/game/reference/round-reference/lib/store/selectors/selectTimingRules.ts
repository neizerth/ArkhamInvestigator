import { createSelector } from "@reduxjs/toolkit";
import { selectRules, whereId } from "@shared/lib";

export const selectTimingRules = createSelector([selectRules], (rules) => {
	return rules?.find(whereId("Appendix_II_Timing_and_Gameplay"))?.rules?.[0];
});
